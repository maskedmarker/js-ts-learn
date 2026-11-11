# BigInt 字面量的编译结果

> 问题来源：[src/basic/02-primitive-types.ts](../src/basic/02-primitive-types.ts) 第 51 行
> 问题：`const big: bigint = 9007199254740993n;` 编译后是什么？

## 结论

TS 源码：

```ts
const big: bigint = 9007199254740993n;
```

编译后（target ≥ ES2020，本项目 tsconfig 为 ES2022）：

```js
const big = 9007199254740993n;
```

一行两个东西，命运不同：

| 部分 | 性质 | 编译后 |
|------|------|--------|
| `: bigint` | TS 类型注解 | **被擦除**，不产生任何运行时代码 |
| `9007199254740993n` | JS 原生 BigInt 字面量（ES2020 起） | **原样保留**——这不是 TS 语法，tsc 只是把它抄过去 |

## 实测的坑：target 低于 ES2020 无法编译

用 `--target es5` 编译同一行，得到：

```
error TS2737: BigInt literals are not available when targeting lower than ES2020.
```

BigInt 与大多数新语法的区别：**async/await 能降级成 generator、可选链能展开成条件判断，但 BigInt 无法降级**——老引擎根本没有大整数能力，没有任何等价的老写法可以转换。所以要么 `target` ≥ ES2020，要么别用 bigint。

## 为什么这个例子选 9007199254740993

`9007199254740993` = 2⁵³ + 1，恰好比 `Number.MAX_SAFE_INTEGER`（2⁵³ − 1 = `9007199254740991`）大 2，是**普通 number 无法精确表示的第一个整数**：

```ts
const asNumber: number = 9007199254740993;
console.log(asNumber);   // 9007199254740992 ← 精度丢了！
console.log(big);        // 9007199254740993n ← bigint 精确
```

整数超过 2⁵³ − 1 后，`number` 会静默丢失精度，`bigint` 不会——这正是 bigint 存在的意义。

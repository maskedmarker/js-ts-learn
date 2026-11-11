# typeof 与类型擦除

> 问题来源：[src/basic/01-typescript-basics.ts](../src/basic/01-typescript-basics.ts) 第 38-39 行
> 问题：`typeof num` 在运行时的对应代码是什么？

## 结论

TS 源码：

```ts
const num: number = 123;
console.log('typeof num:', typeof num);       // number
```

编译后的 JS（实测 `tsc --target es2022`）：

```js
const num = 123;                              // ← 类型注解 : number 被擦除了
console.log('typeof num:', typeof num);       // ← 原样保留，一行没变
```

## 要点

1. **`typeof num` 原封不动地保留了下来**——因为它是 JavaScript 的 `typeof` 运算符（运行时表达式），不是 TypeScript 的类型语法。运行时它对值 `123` 求值，返回字符串 `"number"`。

2. **被擦除的是类型注解 `: number`**——注解只给编译器看，运行时不存在。这正是「类型擦除」的含义。

3. **`typeof` 在 TS 中有两个完全不同的含义**：

   | 位置 | 含义 | 何时求值 |
   |------|------|---------|
   | `typeof num`（值位置） | JS 运算符：值 → 字符串 | 运行时，原样保留 |
   | `type T = typeof num`（类型位置） | TS 类型查询：值 → 类型 | 编译期，完全擦除，不产生任何运行时代码 |

4. 运行时的 `typeof` 反映的是「值的 JS 运行时类型」——`"number"`、`"string"`、`"object"`（含 `typeof null === 'object'` 的历史 bug）等。TS 的联合类型、`interface`、泛型在运行时都不存在，`typeof` 查不到它们。

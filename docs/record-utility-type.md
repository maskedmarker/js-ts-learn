# Record 工具类型

> 问题来源：[src/basic/03-type-inference.ts](../src/basic/03-type-inference.ts) 第 56 行（`satisfies Record<string, string>`）
> 问题：Record 是什么？

## 官方定义

`typescript/lib/lib.es5.d.ts` 第 1613 行：

```ts
type Record<K extends keyof any, T> = {
    [P in K]: T;
};
```

**`Record<K, V>` 是一个内置的「映射类型」：把键集合 K 中的每个键，都映射成值为 V 的属性**，从而构造出一个对象类型。它是「类型层面的函数」——只在编译期存在，不产生任何运行时代码。

拆解定义：

- `K extends keyof any`：K 必须是合法的键类型（`string | number | symbol`）
- `[P in K]: T`：遍历 K 里的每个键 P，生成属性 `P: V`

## 三个最常见形态

```ts
// 1. 字典：任意字符串键，值都是 string
type Dict = Record<string, string>;
const d: Dict = { hello: '你好', anyKey: '任意值' };

// 2. 固定键：必须恰好有这几个键，一个不能少（见 src/basic/11-utility-types.ts）
type Permissions = Record<'admin' | 'user' | 'guest', boolean>;
const p: Permissions = { admin: true, user: false, guest: false };
// 少写 guest 或键名拼错，都会报编译错误

// 3. 值可以是联合类型
type Mixed = Record<string, string | number>;
const m: Mixed = { name: 'Alice', age: 30 };
```

## `satisfies Record<string, string>` 在做什么

```ts
const palette = {
  primary: '#007acc',
  secondary: '#6c6c6c',
} satisfies Record<string, string>;
```

`satisfies` 的意思是：**校验 palette 满足「所有值都是 string」这个约束，但不改变推断结果**（`primary` 仍是字面量 `'#007acc'` 而不是宽化的 `string`）。把 `secondary` 改成数字 `123` 会立刻报编译错误。

注意：它只约束「值」，不锁定「键名」——`Record<string, string>` 对键没有任何限制。

## 等价写法

`Record<string, V>` 完全等价于索引签名，只是更简洁：

```ts
type A = Record<string, string>;
type B = { [key: string]: string };   // 完全一样
```

## 常见坑

1. **约束的是「所有」属性**——包括方法。`{ a: 1, fn() {} } satisfies Record<string, number>` 会报错，因为 `fn` 不是 number。

2. **只是类型，不是运行时结构**。它和 `Map` 完全不是一回事：

   | | Record | Map |
   |---|---|---|
   | 存在阶段 | 只有编译期 | 运行时数据结构 |
   | 运行时形态 | 普通对象 | Map 实例（有 size、迭代器） |
   | 键的类型 | 数字键会变成字符串 | 保留原始类型 |

3. **管不了运行时**。类型擦除后它什么都没剩下，运行时动态塞进去的键值不受任何检查——想运行时约束要用 `Map` 或写校验函数。

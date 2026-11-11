// 01 - TypeScript 基础
// TS 是什么、类型注解、编译期与运行期

const title = '01 - TypeScript 基础';

console.log('=== ' + title + ' ===');
console.log('');

// === 什么是 TypeScript ===
// TypeScript = JavaScript + 静态类型系统
// 类型只在「编译期」检查,编译成 JS 后被完全擦除,运行时不存在
// 所以 TS 最终运行在 Node / 浏览器里,行为与 JS 完全一致

// === 类型注解 (Type Annotation) ===
// 在变量名后用 `: 类型` 声明类型
const language: string = 'TypeScript';
let version: number = 5;
const isAwesome: boolean = true;

console.log(`欢迎学习 ${language} ${version}.x`);
console.log('isAwesome:', isAwesome);
console.log('');

// === 类型推断 (Type Inference) ===
// 即使不写注解,TS 也会根据赋值自动推断类型
let inferredName = 'Node.js';   // 推断为 string
// inferredName = 42;           // ❌ 编译错误:不能把 number 赋给 string
console.log('inferredName:', inferredName);
console.log('');

// === 编译期 vs 运行期 ===
// 下面的错误在「运行前」就会被发现,这就是 TS 的价值:
// let age: number = '十八';            // ❌ 类型错误,编译不过
// const n: number = 1; n.toUpperCase(); // ❌ number 上没有 toUpperCase 方法

// === 类型擦除演示 ===
// 注解只是给编译器看的。运行时 typeof 检查,得到的是 JS 类型
const num: number = 123;
console.log('typeof num:', typeof num);       // number
console.log('');

// === const vs let ===
// const: 声明后不能重新赋值(推荐默认使用)
// let:   可以重新赋值
const PI = 3.14;
let counter = 0;
counter++;
console.log('PI:', PI, 'counter:', counter);
console.log('');

// === 总结 ===
// 1. TS 是 JS 的超集:合法 JS 几乎都是合法 TS
// 2. 类型注解 `: 类型` 与类型推断互为补充
// 3. 类型只在编译期存在,运行期被擦除
// 4. tsconfig 开启 strict 模式能捕获最多的潜在 bug

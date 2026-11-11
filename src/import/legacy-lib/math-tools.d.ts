// 为 math-tools.js(模拟的无类型三方库)编写的类型声明文件
// 规则:文件必须与 .js 同名,TS 编译时自动配对
//   - 编译期:tsc 用这个 .d.ts 检查类型
//   - 运行期:tsx/node 加载真正的 .js
// .d.ts 中的一切都会被完全擦除,不产生任何运行时代码
// (在 .d.ts 里 declare 可以省略,这里显式写出是为了看清楚「声明」的语义)

// === 常量:declare 声明「别处已存在」的导出 ===
export declare const PI: number;

// === 函数:只写签名,不写实现体 ===
export declare function add(a: number, b: number): number;
export declare function multiply(a: number, b: number): number;

// === 函数重载:与普通 TS 一样支持多组签名 ===
export declare function greet(name: string): string;
export declare function greet(names: string[]): string;

// === 类:声明类的形状(构造函数 + 方法签名),不写方法实现 ===
export declare class Calculator {
  constructor(value?: number);
  add(n: number): this;
  getValue(): number;
}

// === 工厂函数 ===
export declare function createCalculator(initialValue?: number): Calculator;

// === 纯类型也可以放进声明文件,供消费方 import type ===
// declare是用来声明已实现的三方实现的签名,而这里自己声明的类型信息,所以不用declare,直接 export 即可
export interface MathToolsConfig {
  precision: number;
  mode: 'scientific' | 'standard';
}

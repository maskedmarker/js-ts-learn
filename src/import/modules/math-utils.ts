// 被 13-modules.ts 导入的演示模块
// 展示:命名导出、默认导出、常量导出

// 不仅导出了函数,还导出了函数的类型信息
export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

// 不仅导出了常量,还导出了常量的类型信息
export const PI = 3.14159;

// 默认导出:一个模块只能有一个 default
export default function greet(name: string): string {
  return `Hello, ${name}!`;
}

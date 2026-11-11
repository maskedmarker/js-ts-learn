// 被 13-modules.ts 导入的演示模块
// 展示:命名导出、默认导出、常量导出

export function add(a: number, b: number): number {
  return a + b;
}

export function multiply(a: number, b: number): number {
  return a * b;
}

export const PI = 3.14159;

// 默认导出:一个模块只能有一个 default
export default function greet(name: string): string {
  return `Hello, ${name}!`;
}

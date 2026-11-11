// 模拟「无类型的三方库」:纯 JS 实现,不带任何类型信息
// 项目里使用它时,类型提示来自同目录的 math-tools.d.ts(14-declare.ts 演示)

export const PI = 3.14159;

export function add(a, b) {
  return a + b;
}

export function multiply(a, b) {
  return a * b;
}

// 支持单个名字或名字数组(对应 .d.ts 里的两组重载签名)
export function greet(name) {
  if (Array.isArray(name)) {
    return `Hello, ${name.join(', ')}!`;
  }
  return `Hello, ${name}!`;
}

export class Calculator {
  constructor(value = 0) {
    this.value = value;
  }

  add(n) {
    this.value += n;
    return this;
  }

  getValue() {
    return this.value;
  }
}

export function createCalculator(initialValue = 0) {
  return new Calculator(initialValue);
}

// 04 - 函数
// 参数/返回值注解、可选参数、默认参数、函数类型、函数重载

console.log('=== 04 - 函数 ===');
console.log('');

// === 参数与返回值注解 ===
function add(a: number, b: number): number {
  return a + b;
}
console.log('add(1, 2):', add(1, 2));
// add('1', 2);   // ❌ 参数类型错误

// 无返回值 -> void
function greet(name: string): void {
  console.log(`Hello, ${name}!`);
}
greet('TS');
console.log('');

// 函数表达式(类型自动推断)
const subtract = function (a: number, b: number): number {
  return a - b;
};
console.log('subtract(5, 3):', subtract(5, 3));

// 箭头函数
const multiply = (a: number, b: number): number => a * b;
console.log('multiply(3, 4):', multiply(3, 4));
console.log('');

// === 可选参数 ? ===
// 可选参数必须放在必选参数后面
function buildName(first: string, last?: string): string {
  return last ? `${first} ${last}` : first;
}
console.log('buildName("Ada"):', buildName('Ada'));
console.log('buildName("Ada", "Lovelace"):', buildName('Ada', 'Lovelace'));
console.log('');

// === 默认参数 ===
// 有默认值的参数自动变为可选
function power(base: number, exponent: number = 2): number {
  return base ** exponent;
}
console.log('power(3):', power(3));
console.log('power(3, 3):', power(3, 3));
console.log('');

// === 剩余参数 ===
function sum(...numbers: number[]): number {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log('sum(1, 2, 3, 4):', sum(1, 2, 3, 4));
console.log('');

// === 函数类型 ===
// 用箭头语法描述「函数」这个类型
type MathOperation = (a: number, b: number) => number;

const divide: MathOperation = (a, b) => a / b;   // 参数类型从 MathOperation 推断
console.log('divide(10, 2):', divide(10, 2));

// 函数作为参数(回调)
function applyOperation(a: number, b: number, op: MathOperation): number {
  return op(a, b);
}
console.log('applyOperation(6, 3, multiply):', applyOperation(6, 3, multiply));
console.log('');

// === 函数重载 ===
// 同一函数、多组签名:不同参数 -> 不同返回值
function format(value: string): string;
function format(value: number): string;
function format(value: string | number): string {
  return `格式化结果: ${value}`;
}
console.log(format('文本'));
console.log(format(100));
console.log('');

// === 解构参数 ===
// 解构参数的注解要写整体对象类型(注意是整体的类型信息,不能缺少属性)
function createPoint({ x, y }: { x: number; y: number }): { x: number; y: number } {
  return { x, y };
}
const p = createPoint({ x: 1, y: 2 });
console.log('point:', p);
console.log('');

// Object literal may only specify known properties, and 'z' does not exist in type '{ x: number; y: number; }'
// const p2 = createPoint({ x: 1, y: 2, z: 3 });   // ❌ 参数类型错误

// === 坑汇总 ===
// 1. 可选参数(?)必须排在必选参数之后
// 2. 可选参数在函数体内是 `T | undefined`,使用前要判断
// 3. 重载的实现签名不对外可见,外部只能按声明的签名调用
// 4. 箭头函数不绑定自己的 this,TS 里 this 类型标注是另一话题

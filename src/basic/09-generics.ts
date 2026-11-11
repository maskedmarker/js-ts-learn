// 09 - 泛型
// 类型参数:让类型「随调用变化」,兼顾复用与安全

console.log('=== 09 - 泛型 ===');
console.log('');

// === 泛型函数 ===
// <T> 是「类型参数」:调用时确定具体类型
function identity<T>(value: T): T {
  return value;
}
console.log('identity<string>:', identity<string>('hello'));
console.log('identity<number>:', identity<number>(42));
// 不写 <类型> 也能自动推断
console.log('identity(推断):', identity(true));
console.log('');

// === 泛型数组 ===
function firstElement<T>(arr: T[]): T {
  return arr[0]!;   // ! 非空断言:告诉编译器「这里一定有值」(开启 noUncheckedIndexedAccess 时很有用)
}
console.log('firstElement:', firstElement([10, 20, 30]));
console.log('');

// === 多个类型参数 ===
function pair<A, B>(a: A, b: B): [A, B] {
  return [a, b];
}
console.log('pair:', pair('name', 30));
console.log('');

// === 泛型接口 ===
interface Box<T> {
  value: T;
}
const numberBox: Box<number> = { value: 123 };
const stringBox: Box<string> = { value: 'abc' };
console.log('numberBox:', numberBox, 'stringBox:', stringBox);
console.log('');

// === 泛型约束 extends ===
// 要求 T 必须满足某种「形状」
interface HasLength {
  length: number;
}
function logLength<T extends HasLength>(value: T): void {
  console.log(`长度: ${value.length}`);
}
logLength('字符串有 length');
logLength([1, 2, 3]);
// logLength(123);   // ❌ number 没有 length
console.log('');

// === keyof 约束:安全地访问属性 ===
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}
const person = { name: 'Alice', age: 30 };
console.log('getProperty name:', getProperty(person, 'name'));
console.log('getProperty age:', getProperty(person, 'age'));
// getProperty(person, 'job');   // ❌ 'job' 不是 person 的 key
console.log('');

// === 泛型默认值 ===
interface ApiResponse<T = string> {
  code: number;
  data: T;
}
const res1: ApiResponse = { code: 200, data: '默认是 string' };        // T 默认为 string
const res2: ApiResponse<number[]> = { code: 200, data: [1, 2, 3] };    // 显式指定
console.log('res1:', res1);
console.log('res2:', res2);
console.log('');

// === 坑汇总 ===
// 1. 泛型是「编译期」概念,运行时不产生额外代码
// 2. 类型参数不要滥用:能推断就别显式写,能约束就加 extends
// 3. 约束用 extends 而非 =,后者是「默认值」不是「限制」
// 4. T[K] 这种「索引访问类型」是 keyof 的黄金搭档

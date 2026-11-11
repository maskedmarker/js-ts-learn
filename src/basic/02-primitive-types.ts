// 02 - 原始类型
// number / string / boolean / null / undefined / bigint / symbol / 字面量类型

console.log('=== 02 - 原始类型 ===');
console.log('');

// === number:所有数字只有一种类型,不分 int/float ===
const integer: number = 42;
const float: number = 3.14;
const hex: number = 0xff;         // 十六进制
const binary: number = 0b1010;    // 二进制
const nan: number = NaN;
console.log('integer:', integer, 'float:', float, 'hex:', hex, 'binary:', binary);
console.log('NaN === NaN:', nan === nan);   // false,NaN 判断要用 Number.isNaN
console.log('');

// === string ===
const single: string = '单引号';
const double: string = "双引号";
const template: string = `模板:${single} + ${double}`;
console.log(template);
console.log('');

// === boolean ===
const yes: boolean = true;
const no: boolean = false;
console.log('yes:', yes, 'no:', no);
console.log('');

// === null 与 undefined ===
// strictNullChecks(tsconfig strict 已开启)下,
// null / undefined 不能赋给其他类型
let maybeString: string | null = null;   // 联合类型,07 课细讲
maybeString = '现在有值了';
console.log('maybeString:', maybeString);
// let s: string = null;   // ❌ strict 下编译错误
console.log('');

// === 字面量类型 (Literal Types) ===
// 把「具体的值」当类型用
const literalString = 'hello';          // const 推断为字面量类型 'hello'
let mutableString = 'hello';            // let 推断宽化为 string
const direction: 'left' | 'right' = 'left';
// direction = 'up';                    // ❌ 只能是 'left' 或 'right'
const httpStatus: 200 | 404 | 500 = 200;
console.log('literalString:', literalString, 'mutableString:', mutableString);
console.log('direction:', direction, 'httpStatus:', httpStatus);
console.log('');

// === bigint:超大整数 ===
const big: bigint = 9007199254740993n;    // 注意结尾的 n
console.log('bigint:', big);
// const bad: bigint = 123;               // ❌ number 不能赋给 bigint
console.log('');

// === symbol:独一无二的值 ===
const sym1: symbol = Symbol('key');
const sym2: symbol = Symbol('key');
console.log('sym1 === sym2:', sym1 === sym2);   // false,每个 symbol 都唯一
console.log('');

// === any / unknown / never / void ===
// any: 关掉类型检查(尽量少用,等于放弃 TS 保护)
const anything: any = 123;
// anything.foo.bar();    // ⚠️ 编译能通过,但运行时报错!这就是 any 的危险
console.log('anything:', anything);

// unknown: 安全的 any——使用前必须先收窄类型
const notSure: unknown = '可能是任何东西';
if (typeof notSure === 'string') {
  console.log('unknown 收窄后:', notSure.toUpperCase());
}
// notSure.toUpperCase();   // ❌ unknown 不能直接调用方法
console.log('');

// never: 永远不会发生的类型(函数抛异常/死循环)
function fail(message: string): never {
  throw new Error(message);
}
console.log('never 类型函数已定义(调用会抛异常,这里不调用)');

// void: 函数没有返回值
function log(msg: string): void {
  console.log('void 函数输出:', msg);
  // 没有 return
}
log('你好');
console.log('');

// === 类型断言 (Type Assertion) ===
// 告诉编译器「我知道得更清楚」,两种写法等价
const someValue: unknown = 'hello world';
const asSyntax = (someValue as string).length;       // 推荐写法
console.log('as 断言长度:', asSyntax);
// const angleSyntax = (<string>someValue).length;   // 老写法,JSX 里不能用
console.log('');

// === 坑汇总 ===
// 1. typeof null === 'object'(历史遗留 bug),判断 null 要用 === null
// 2. NaN 是 number 类型,但 NaN !== NaN,判断要用 Number.isNaN
// 3. any 会传染:any 赋值给其他变量,其他变量也失去检查
// 4. 断言只改变「类型视角」,不改变运行时值;断言错了运行时照样崩

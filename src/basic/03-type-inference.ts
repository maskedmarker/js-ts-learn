// 03 - 类型推断与显式注解
// TS 如何「猜」类型、什么时候需要自己写

console.log('=== 03 - 类型推断 ===');
console.log('');

// === 基础推断 ===
let name = 'TypeScript';     // string
let count = 0;               // number
let flag = true;             // boolean
let data = [1, 2, 3];        // number[]
let tuple = ['a', 1];        // (string | number)[]
console.log('name:', name, 'count:', count, 'flag:', flag);
console.log('data:', data, 'tuple:', tuple);
console.log('');

// === const 的字面量推断 ===
const name2 = 'TS';          // 'TS'(字面量类型,const 不会变)
let name3 = 'TS';            // string(可变,所以推断「宽化」)
console.log('const 推断:', name2, '| let 推断:', name3);
console.log('');

// === 上下文推断 ===
// 回调参数无需注解,从上下文自动推断
const nums = [1, 2, 3];
nums.map((n) => n * 2);      // n 自动推断为 number
nums.forEach((n, i) => console.log(`nums[${i}] = ${n}`));
console.log('');

// === 最佳公共类型 ===
// 数组元素类型取「最小公共父类型」
const mixed = [1, 'two', true];   // (string | number | boolean)[]
console.log('mixed:', mixed);
console.log('');

// === 需要显式注解的场景 ===
// 1. 函数参数(没有推断依据,04 课会看到)
// 2. 声明时不赋值的变量
let later: number;
later = 10;
console.log('later:', later);

// 3. 想要更精确的类型时:as const 收窄为字面量
const config = {
  mode: 'production' as const,
};
// config.mode = 'development';   // ❌ mode 被锁定为 'production'
console.log('config.mode:', config.mode);
console.log('');

// === satisfies:检查但保留推断 ===
// 既校验结构,又不扩大/收窄推断结果
const palette = {
  primary: '#007acc',
  secondary: '#6c6c6c',
} satisfies Record<string, string>;
// 上面若把 secondary 写成数字,编译会报错;而推断结果仍是精确的字面量
console.log('palette.primary:', palette.primary);
console.log('');

// === 坑汇总 ===
// 1. let 推断会「宽化」(string),const 保留字面量('TS')
// 2. 对象属性默认被宽化,需要锁定时用 as const 或 satisfies
// 3. 回调参数类型来自上下文,别重复写注解(反而可能出错)
// 4. 函数参数必须显式注解——这是最常见的推断盲区

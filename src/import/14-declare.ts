// 14 - declare:给无类型的三方库写声明
// 场景:三方库只提供 .js(没有类型信息),项目直接用会失去所有类型检查
// 解法:写一个同名的 .d.ts 声明文件,用 declare 描述它的 API

console.log('=== 14 - declare 声明 ===');
console.log('');

// === 场景说明 ===
// legacy-lib/math-tools.js :模拟的三方库,纯 JS,编译器对它一无所知
// legacy-lib/math-tools.d.ts:我们为它写的声明文件(declare 描述 API)
// 规则:同名 .d.ts 自动配对——编译期用 .d.ts,运行时加载 .js
console.log('目录结构:');
console.log('  legacy-lib/');
console.log('  ├── math-tools.js      # 三方库本体(纯 JS,无类型)');
console.log('  └── math-tools.d.ts    # 我们写的声明(declare 描述 API)');
console.log('');

// === 导入使用:类型提示全部来自 .d.ts ===
import {
  add,
  multiply,
  PI,
  greet,
  createCalculator,
  type MathToolsConfig,
} from './legacy-lib/math-tools';

// 常量:声明为 number,赋给 string 会报错
console.log('PI:', PI);
// const bad: string = PI;   // ❌ number 不能赋给 string

// 函数:参数和返回值都有类型
console.log('add(1, 2):', add(1, 2));
console.log('multiply(3, 4):', multiply(3, 4));
// add('1', 2);   // ❌ 声明生效:参数类型被检查
console.log('');

// === 声明文件里的 interface 也可以 import type ===
const config: MathToolsConfig = { precision: 2, mode: 'scientific' };
console.log('config:', config);
console.log('');

// === 函数重载:声明文件里照常支持 ===
console.log('greet("World"):', greet('World'));
console.log('greet(["World", "TS"]):', greet(['World', 'TS']));
console.log('');

// === 类:new 出的实例有完整方法提示 ===
const calc = createCalculator(10);
console.log('createCalculator(10).add(5).getValue():', calc.add(5).getValue());
console.log('');

// === 声明的本质是「承诺」 ===
// .d.ts 只是类型契约,运行时代码是真正的 .js
// 如果声明与实际实现不一致:
//   - 声明了但 .js 没实现 -> 编译期通过,运行时报错
//   - .js 有但没声明    -> 编译期报错(提示找不到该导出)
// 所以声明文件要和库的版本保持一致(@types 包的版本号就是干这个的)
console.log('=== 小结 ===');
console.log('1. declare 只描述类型,不产生任何运行时代码');
console.log('2. 同名 .d.ts 自动配对:编译期用它,运行时用 .js');
console.log('3. 真实世界来源:库自带 .d.ts,或安装 @types/xxx(DefinitelyTyped 社区)');
console.log('4. 全局库(script 标签引入)用 declare global;模块库用本课的模式');

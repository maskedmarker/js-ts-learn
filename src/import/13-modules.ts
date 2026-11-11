// 13 - 模块系统
// 命名导入/默认导入/重命名/import type/桶文件/副作用导入/动态导入

console.log('=== 13 - 模块 ===');
console.log('');

// === 命名导入 ===
import { add, multiply } from './modules/math-utils';
console.log('add(1, 2):', add(1, 2));
console.log('multiply(3, 4):', multiply(3, 4));
console.log('');

// === 默认导入 ===
import greet from './modules/math-utils';
console.log('greet:', greet('TypeScript'));
console.log('');

// === 重命名导入 ===
import { PI as PI_VALUE } from './modules/math-utils';
console.log('PI 重命名:', PI_VALUE);
console.log('');

// === import type:只导入类型 ===
// 类型导入在编译后完全消失,运行时不产生任何代码
import type { User, ID } from './modules/types';
const u: User = { id: 1, name: 'Alice' };
const id: ID = 'abc';
console.log('import type 使用:', u, id);
console.log('');

// === 值导入(枚举是值,不能用 import type) ===
import { Role } from './modules/types';
console.log('Role.Admin:', Role.Admin);
console.log('');

// === 桶文件导入 ===
import { greet as greetFromBarrel, PI as pi, Role as Role2 } from './modules/index';
import type { User as User2 } from './modules/index';
const u2: User2 = { id: 2, name: 'Bob' };
console.log('桶文件导入:', greetFromBarrel('Barrel'), pi, Role2.User, u2);
console.log('');

// === 副作用导入:只执行模块,不导入任何东西 ===
// 注意:静态 import 会被「提升」到文件顶部执行,无论写在哪个位置;
// 动态 import 则在调用处才执行。这里用动态导入保证输出顺序
await import('./modules/logger');
console.log('');

// === 动态导入 ===
// 返回 Promise,适合按需加载;await 后拿到模块命名空间
const { add: dynAdd } = await import('./modules/math-utils');
console.log('动态导入 add(5, 5):', dynAdd(5, 5));
console.log('');

// === 小结 ===
// 1. import type 只存在于编译期,运行时不产生任何代码
// 2. 枚举是「值+类型」双身份,要用普通 import
// 3. 桶文件(index.ts)让外部导入更简洁
// 4. 动态 import 返回 Promise,适合按需加载
// 5. 同一个模块无论被导入多少次,代码只执行一次(模块缓存)

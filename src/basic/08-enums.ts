// 08 - 枚举
// 数字枚举、字符串枚举、const enum、枚举的类型与反向映射

console.log('=== 08 - 枚举 ===');
console.log('');

// === 数字枚举 ===
// 默认从 0 开始自增
enum Direction {
  Up,      // 0
  Down,    // 1
  Left,    // 2
  Right,   // 3
}
console.log('Direction.Up:', Direction.Up);
console.log('Direction[1]:', Direction[1]);   // 'Down'(数字枚举支持反向映射)
console.log('');

// 自定义起始值
enum Status {
  Pending = 1,
  Success,      // 2 自动 +1
  Failed,       // 3
}
console.log('Status.Success:', Status.Success);
console.log('');

// === 字符串枚举 ===
// 没有反向映射,但值更可读(推荐,适合序列化/日志)
enum Color {
  Red = 'red',
  Green = 'green',
  Blue = 'blue',
}
console.log('Color.Red:', Color.Red);
console.log('');

// === 枚举是类型 ===
let dir: Direction = Direction.Left;
// dir = 'left';          // ❌ 字符串不能赋给枚举类型
dir = Direction.Right;     // ✅
console.log('dir:', dir);

function move(d: Direction): string {
  switch (d) {
    case Direction.Up: return '向上';
    case Direction.Down: return '向下';
    case Direction.Left: return '向左';
    case Direction.Right: return '向右';
  }
}
console.log('move:', move(Direction.Left));
console.log('');

// === const enum:编译期直接内联 ===
// 不生成运行时对象,体积更小;但无法反向映射
const enum HttpStatus {
  OK = 200,
  NotFound = 404,
  ServerError = 500,
}
console.log('HttpStatus.OK:', HttpStatus.OK);
// console.log(HttpStatus[200]);   // ❌ const enum 没有反向映射
console.log('');

// === 替代方案:字面量联合类型 ===
// 团队里也有很多人不用 enum,改用「联合类型 + as const」,更轻量
const ROLES = ['admin', 'user', 'guest'] as const;
type Role = (typeof ROLES)[number];   // 'admin' | 'user' | 'guest'

function checkRole(role: Role): string {
  return `角色是 ${role}`;
}
console.log('checkRole:', checkRole('admin'));
// checkRole('hacker');   // ❌ 不是合法角色
console.log('');

// === 坑汇总 ===
// 1. 数字枚举有反向映射,字符串枚举没有
// 2. 数字枚举的值可能不是预期(自动 +1 后改动中间项会错位),字符串枚举更稳
// 3. const enum 在跨文件/isolatedModules 场景下有坑,单文件内最安全
// 4. enum 是「值+类型」双身份,import 时不能用 import type(13 课演示)

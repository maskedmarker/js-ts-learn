// 07 - 联合类型与类型收窄
// 一个值可能是多种类型,TS 如何「收窄」到确定的一种

console.log('=== 07 - 联合类型与收窄 ===');
console.log('');

// === 联合类型: A | B ===
type ID = string | number;

function printId(id: ID): void {
  // 直接调用会报错:string | number 上没有共有的方法可用
  // console.log(id.toUpperCase());   // ❌

  // === typeof 收窄 ===
  if (typeof id === 'string') {
    console.log(`字符串 ID(大写): ${id.toUpperCase()}`);
  } else {
    console.log(`数字 ID(加 1): ${id + 1}`);
  }
}
printId('abc-123');
printId(100);
console.log('');

// === in 收窄:判断属性是否存在 ===
// 无入参时,不能写成(void) => string 
// 因为 函数类型签名的参数表 ( ... ) 里写的是参数名（可带类型注解），不是类型本身
// 当然也可以这样实现: (arg?: void) => string
type Bird = { fly: () => string };
type Fish = { swim: () => string };

function move(animal: Bird | Fish): string {
  if ('fly' in animal) {
    return animal.fly();     // 这里 animal 已被收窄为 Bird
  }
  return animal.swim();      // 收窄为 Fish
}
const bird: Bird = { fly: () => '🕊️ 我会飞' };
const fish: Fish = { swim: () => '🐟 我会游' };
console.log(move(bird));
console.log(move(fish));
console.log('');

// === 判别联合 (Discriminated Union) ===
// 每个成员带一个字面量字段 kind,switch 里自动收窄
interface Circle { kind: 'circle'; radius: number }
interface Square { kind: 'square'; side: number }
type Shape = Circle | Square;

function area(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;   // 收窄为 Circle
    case 'square':
      return shape.side ** 2;               // 收窄为 Square
  }
}
console.log('圆面积:', area({ kind: 'circle', radius: 2 }).toFixed(2));
console.log('方面积:', area({ kind: 'square', side: 3 }));
console.log('');

// === never 检查:穷尽性校验 ===
// 如果未来给 Shape 加了新成员,describe 会报编译错误提醒你
function assertNever(value: never): never {
  throw new Error(`未处理的类型: ${String(value)}`);
}
function describe(shape: Shape): string {
  switch (shape.kind) {
    case 'circle': return '圆形';
    case 'square': return '方形';
    default: return assertNever(shape);   // 走到这里 shape 已是 never
  }
}
console.log('describe:', describe({ kind: 'circle', radius: 1 }));
console.log('');

// === 坑汇总 ===
// 1. 联合类型只能访问「所有成员共有」的属性/方法
// 2. typeof null === 'object',用 typeof 收窄时 null 不会被排除
// 3. 判别联合的 kind 字段要用字面量类型,不要用 string(否则无法收窄)
// 4. 用 assertNever + default 保证 switch 穷尽,新增成员时编译期报警

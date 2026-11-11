// 05 - 对象与接口
// 对象类型字面量、interface、type、可选属性、readonly、继承、交叉类型

console.log('=== 05 - 对象与接口 ===');
console.log('');

// === 对象类型字面量 ===
const user: { name: string; age: number } = { name: 'Alice', age: 30 };
console.log('user:', user);
console.log('');

// === interface:描述对象的「形状」 ===
interface Person {
  name: string;
  age: number;
}

// 可以复用
const person1: Person = { name: 'Bob', age: 25 };
const person2: Person = { name: 'Cara', age: 28 };
console.log('person1:', person1, 'person2:', person2);
// const bad: Person = { name: '缺少 age' };   // ❌ 缺少必需属性
console.log('');

// === 可选属性 ? ===
interface Car {
  brand: string;
  year?: number;     // 可有可无
}
const car1: Car = { brand: 'Toyota' };
const car2: Car = { brand: 'BMW', year: 2024 };
console.log('car1:', car1, 'car2:', car2);

// 访问可选属性:strict 下可能是 undefined,要先检查
if (car2.year !== undefined) {
  console.log(`car2 年份: ${car2.year}`);
}
// console.log(car2.year.toString());   // ❌ 可能是 undefined
console.log('');

// === readonly:只读属性 ===
interface Config {
  readonly appName: string;
  port: number;
}
const config: Config = { appName: 'my-app', port: 8080 };
// config.appName = 'other';   // ❌ 只读
config.port = 9090;            // ✅ 非只读可以改
console.log('config:', config);
console.log('');

// === 索引签名 ===
interface Dictionary {
  [key: string]: string;
}
const dict: Dictionary = { hello: '你好', world: '世界' };
console.log('dict:', dict);
console.log('');

// === interface 继承 extends ===
interface Animal {
  name: string;
}
interface Dog extends Animal {
  bark(): void;
}
const dog: Dog = {
  name: '旺财',
  bark() {
    console.log('汪汪!');
  },
};
dog.bark();
console.log('');

// === type 类型别名 ===
// type 更灵活:可以写联合类型、交叉类型等
type ID = string | number;
type Point = { x: number; y: number };
type NamedPoint = Point & { name: string };    // 交叉类型:合并两个形状

const np: NamedPoint = { x: 1, y: 2, name: 'P1' };
console.log('np:', np);
const id: ID = 'abc-123';
console.log('id:', id);
console.log('');

// === interface vs type 小结 ===
// interface: 专用于对象形状,支持声明合并、继承,IDE 提示更友好
// type:     更通用,支持联合/交叉/字面量/映射等
// 项目里两者都能用,团队约定统一即可(本系列以 interface 描述对象为主)

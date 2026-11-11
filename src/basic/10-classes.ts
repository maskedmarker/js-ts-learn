// 10 - 类
// 访问修饰符、参数属性、getter/setter、继承、抽象类、implements

console.log('=== 10 - 类 ===');
console.log('');

// === 基本类与访问修饰符 ===
// public(默认,所有地方可访问)
// private(只有类内部可访问)
// protected(类内部 + 子类可访问)
class Animal {
  public name: string;         // public 可省略
  private age: number;
  protected species: string;

  constructor(name: string, age: number, species: string) {
    this.name = name;
    this.age = age;
    this.species = species;
  }

  // 类内部可以访问 private
  getAge(): number {
    return this.age;
  }
}

const cat = new Animal('咪咪', 3, '猫科');
console.log('cat:', cat.name, '年龄:', cat.getAge());
// console.log(cat.age);       // ❌ private 外部不可访问
// console.log(cat.species);   // ❌ protected 外部不可访问
console.log('');

// === 参数属性:构造函数里直接声明 ===
// 参数前加修饰符,自动成为类属性,代码更简洁
class Point {
  constructor(public x: number, public y: number) {}
}
const p = new Point(3, 4);
console.log('p:', p.x, p.y);
console.log('');

// === readonly 与 static ===
class Config {
  static readonly VERSION = '1.0.0';   // 静态只读:类级别常量
  static count = 0;                    // 静态属性:属于类本身

  constructor(public env: string) {
    Config.count++;
  }
}
const c1 = new Config('dev');
const c2 = new Config('prod');
console.log('版本:', Config.VERSION, '实例数:', Config.count);
// Config.VERSION = '2.0.0';   // ❌ 只读
console.log('');

// === getter / setter ===
class Temperature {
  private _celsius = 0;

  get celsius(): number {
    return this._celsius;
  }
  set celsius(value: number) {
    this._celsius = value;
  }
  get fahrenheit(): number {
    return this._celsius * 9 / 5 + 32;
  }
}
const t = new Temperature();
t.celsius = 25;                    // 通过 setter 赋值
console.log('摄氏:', t.celsius, '华氏:', t.fahrenheit);
console.log('');

// === 继承与 super ===
class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age, '犬科');      // 必须先调用 super
  }
  // protected 属性在子类里可以访问
  describe(): string {
    return `${this.name} 属于 ${this.species}`;
  }
}
const dog = new Dog('旺财', 2);
console.log('dog:', dog.describe(), '年龄:', dog.getAge());
console.log('');

// === abstract 抽象类 ===
// 不能直接 new,只能被继承;抽象方法必须由子类实现
abstract class Shape {
  abstract area(): number;   // 只有签名,没有实现
  describe(): string {
    return `面积是 ${this.area()}`;
  }
}
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  area(): number {
    return Math.PI * this.radius ** 2;
  }
}
console.log('circle:', new Circle(2).describe());
console.log('');

// === implements:实现接口 ===
interface Runnable {
  run(): void;
}
class Machine implements Runnable {
  run(): void {
    console.log('机器开动!');
  }
}
new Machine().run();
console.log('');

// === 坑汇总 ===
// 1. private 是「编译期」约束,运行时用 as any 或方括号仍能绕过
// 2. 子类构造函数必须先调用 super() 才能使用 this
// 3. 参数属性(public/private/protected)只用于构造函数参数
// 4. abstract 类不能 new,abstract 方法子类必须实现

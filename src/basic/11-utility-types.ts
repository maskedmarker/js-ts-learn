// 11 - 常用工具类型
// TS 内置的「类型函数」:Partial / Pick / Omit / Record / ReturnType / Awaited ...

console.log('=== 11 - 工具类型 ===');
console.log('');

interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
}

// === Partial<T>:所有属性变可选 ===
const patch: Partial<User> = { name: '新名字' };   // 只要一部分属性
console.log('patch:', patch);
console.log('');

// === Required<T>:所有属性变必选 ===
interface Draft { name?: string; age?: number }
const full: Required<Draft> = { name: 'Alice', age: 30 };   // 缺一个都报错
console.log('full:', full);
console.log('');

// === Readonly<T>:所有属性变只读 ===
const frozen: Readonly<User> = {
  id: 1, name: 'Bob', email: 'bob@x.com', createdAt: new Date(),
};
// frozen.name = 'x';   // ❌ 只读
console.log('frozen:', frozen);
console.log('');

// === Pick<T, K>:挑几个属性 ===
type UserBrief = Pick<User, 'id' | 'name'>;
const brief: UserBrief = { id: 1, name: 'Cara' };
console.log('brief:', brief);
console.log('');

// === Omit<T, K>:去掉几个属性 ===
type UserWithoutId = Omit<User, 'id'>;
const noId: UserWithoutId = { name: 'Dave', email: 'd@x.com', createdAt: new Date() };
console.log('noId:', noId);
console.log('');

// === Record<K, V>:构造键值对类型 ===
type Role = 'admin' | 'user' | 'guest';
const permissions: Record<Role, boolean> = {
  admin: true,
  user: false,
  guest: false,
};
// 少写一个 key 或 key 写错都会报编译错误
console.log('permissions:', permissions);
console.log('');

// === ReturnType / Parameters:从函数提取类型 ===
function createUser(name: string, age: number): { name: string; age: number } {
  return { name, age };
}
type UserResult = ReturnType<typeof createUser>;          // { name: string; age: number }
type CreateUserArgs = Parameters<typeof createUser>;      // [name: string, age: number]

const result: UserResult = createUser('Eve', 25);
const args: CreateUserArgs = ['Frank', 28];
console.log('result:', result);
console.log('args:', args);
console.log('');

// === Awaited<T>:解开 Promise 的返回类型 ===
async function fetchName(): Promise<string> {
  return 'Grace';
}
type NameResult = Awaited<ReturnType<typeof fetchName>>;   // string
const nameResult: NameResult = await fetchName();
console.log('nameResult:', nameResult);
console.log('');

// === Exclude / Extract / NonNullable ===
type Status = 'pending' | 'done' | 'cancelled';
type ActiveStatus = Exclude<Status, 'cancelled'>;          // 'pending' | 'done'
type DoneStatus = Extract<Status, 'done'>;                 // 'done'
type MaybeString = string | null | undefined;
type DefiniteString = NonNullable<MaybeString>;            // string

const active: ActiveStatus = 'pending';                    // ✅
// const bad: ActiveStatus = 'cancelled';                  // ❌ 已被排除
const done: DoneStatus = 'done';
const text: DefiniteString = '不是 null 也不是 undefined';
console.log('active:', active, 'done:', done, 'text:', text);
console.log('');

// === 坑汇总 ===
// 1. 工具类型是「类型层面的函数」,运行时不存在,别在表达式里调用
// 2. Partial 只浅层可选,嵌套对象内部属性不受影响
// 3. ReturnType 需要传「类型」(typeof fn),不是函数名本身
// 4. Awaited 能递归解开嵌套 Promise,比如 Promise<Promise<T>>

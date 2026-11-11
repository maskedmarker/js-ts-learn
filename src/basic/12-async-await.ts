// 12 - 异步编程的类型
// Promise<T>、async/await 的类型推断、并发、错误收窄、泛型请求

console.log('=== 12 - async/await ===');
console.log('');

// === Promise 的类型 ===
// Promise<T>:T 是 resolve 值的类型
const promiseNumber: Promise<number> = Promise.resolve(42);
promiseNumber.then((n) => {
  console.log('then 里的 n 自动推断为 number:', n);
});
console.log('');

// === async 函数返回 Promise<T> ===
// 返回值类型直接写「解包后」的类型
async function fetchUser(id: number): Promise<{ id: number; name: string }> {
  // 模拟网络请求
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { id, name: `用户${id}` };
}

const user = await fetchUser(1);
console.log('fetchUser 返回:', user);
console.log('');

// === await 自动「拆箱」 ===
// await Promise<number> 得到 number,不是 Promise<number>
async function demo(): Promise<void> {
  const value: number = await Promise.resolve(100);
  console.log('await 拆箱:', value);
}
await demo();
console.log('');

// === Promise.all:并发,返回类型自动组合 ===
async function fetchAll(): Promise<void> {
  const [u1, u2] = await Promise.all([fetchUser(1), fetchUser(2)]);
  console.log('并发结果:', u1, u2);
}
await fetchAll();
console.log('');

// === 错误处理 ===
// catch 到的 error 类型是 unknown(strict 下),需要收窄
async function safeFetch(): Promise<void> {
  try {
    await Promise.reject(new Error('网络错误'));
  } catch (error) {
    if (error instanceof Error) {
      console.log('捕获到错误:', error.message);
    } else {
      console.log('未知错误:', error);
    }
  }
}
await safeFetch();
console.log('');

// === 泛型 Promise 实战:封装请求函数 ===
interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}
async function request<T>(data: T): Promise<ApiResponse<T>> {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return { code: 200, data, message: 'ok' };
}
const res = await request({ items: [1, 2, 3] });
console.log('泛型请求结果:', res);
console.log('');

// === 坑汇总 ===
// 1. async 函数返回类型写 T,不要写成 Promise<T> 以外的类型
// 2. 顶层 await 在 ESM 里合法,CommonJS 里不行(本项目是 ESM)
// 3. catch 的参数在 strict 下是 unknown,必须收窄才能用
// 4. 忘记 await 的 Promise 会「漂着」,类型上 Promise<T> 与 T 不兼容会提醒你

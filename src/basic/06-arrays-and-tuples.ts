// 06 - 数组与元组
// 数组类型注解、泛型数组方法、元组 Tuple、readonly、多维数组

console.log('=== 06 - 数组与元组 ===');
console.log('');

// === 数组两种写法 ===
const nums1: number[] = [1, 2, 3];        // 常见写法
const nums2: Array<number> = [4, 5, 6];   // 泛型写法(等价)
console.log('nums1:', nums1, 'nums2:', nums2);
console.log('');

// === 数组方法自带类型 ===
const doubled = nums1.map((n) => n * 2);            // number[]
const evens = nums1.filter((n) => n % 2 === 0);     // number[]
const total = nums1.reduce((sum, n) => sum + n, 0); // number
console.log('doubled:', doubled, 'evens:', evens, 'total:', total);

// 元素联合类型
const mixed: (string | number)[] = ['a', 1, 'b', 2];
console.log('mixed:', mixed);
console.log('');

// === 元组 Tuple:定长定型的数组 ===
// 数组:所有元素同类型;元组:每个位置各有类型
const point: [number, number] = [10, 20];
const named: [string, number, boolean] = ['Alice', 30, true];
console.log('point:', point);
console.log('named:', named);

// 解构元组,类型一一对应
const [x, y] = point;
console.log('x:', x, 'y:', y);   // 都是 number

// 元组的坑:push 可以绕过长度限制
const pair: [number, number] = [1, 2];
pair.push(3);                    // ⚠️ 编译通过(历史遗留),运行时数组变长了
console.log('pair push 后:', pair);
console.log('');

// === readonly 数组/元组 ===
// 防止被修改,函数参数推荐用 readonly
const frozen: readonly number[] = [1, 2, 3];
// frozen.push(4);    // ❌ readonly 数组不能 push
const frozenTuple: readonly [number, string] = [1, 'a'];
// frozenTuple[0] = 2;   // ❌ 只读
console.log('frozen:', frozen, 'frozenTuple:', frozenTuple);
console.log('');

// === 多维数组 ===
const grid: number[][] = [
  [1, 2, 3],
  [4, 5, 6],
];
console.log('grid[1][2]:', grid[1]?.[2]);   // 6
console.log('');

// === 坑汇总 ===
// 1. 元组长度在「编译期」保证,但 push 能绕过(运行时风险)
// 2. readonly 数组不能传给要求普通数组的函数(类型不兼容)
// 3. 开启 noUncheckedIndexedAccess 后,下标访问返回 T | undefined,
//    能提前暴露越界风险(生产项目推荐开启)
// 4. 稀疏数组、空位与 undefined 混用是运行时 bug 高发区

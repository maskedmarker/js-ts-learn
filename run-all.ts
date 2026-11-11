// 依次运行所有学习示例
// 用动态 import 按顺序执行每个课程文件(tsx 运行器下 .ts 可直接 import)
import { pathToFileURL } from 'node:url';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lessons = [
  'basic/01-typescript-basics.ts',
  'basic/02-primitive-types.ts',
  'basic/03-type-inference.ts',
  'basic/04-functions.ts',
  'basic/05-objects-and-interfaces.ts',
  'basic/06-arrays-and-tuples.ts',
  'basic/07-unions-and-narrowing.ts',
  'basic/08-enums.ts',
  'basic/09-generics.ts',
  'basic/10-classes.ts',
  'basic/11-utility-types.ts',
  'basic/12-async-await.ts',
  'import/13-modules.ts',
  'import/14-declare.ts',
];

console.log('=== TypeScript 学习 - 全部示例 ===');
console.log('');

for (const lesson of lessons) {
  const file = path.join(__dirname, 'src', lesson);
  console.log(`${'='.repeat(60)}`);
  console.log(`▶ 运行: ${lesson}`);
  console.log('='.repeat(60));

  // 动态 import:每个课程都是独立模块,按顺序执行
  await import(pathToFileURL(file).href);
}

console.log('');
console.log('=== 全部完成! ===');

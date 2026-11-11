# docs - 学习问答笔记

记录学习过程中问答产生的解释，作为课程的补充资料。

## 目录

- [typeof 与类型擦除](./typeof-and-type-erasure.md) — 01 课：`typeof num` 在运行时的对应代码是什么
- [BigInt 字面量的编译结果](./bigint-literal-compilation.md) — 02 课：`const big: bigint = 9007199254740993n;` 编译后是什么
- [Record 工具类型](./record-utility-type.md) — 03 课：`satisfies Record<string, string>` 中的 Record 是什么

## 约定

- 每篇文档开头标注「问题来源」（课程文件与行号）与原始问题
- 结论优先，附可验证的编译产物 / 实测报错
- 新增文档时同步更新本目录

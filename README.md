# Hello TypeScript - TypeScript 学习项目

一个用 Node.js 环境学习 TypeScript 语法的练习项目(结构与 [js-lang-learn](../js-lang-learn) 保持一致)。

## 环境要求

- Node.js >= 18 (推荐 20+)
- npm

## 安装

```bash
npm install
```

## 项目结构

```
js-ts-learn/
├── package.json              # 项目配置与脚本
├── tsconfig.json             # TypeScript 编译配置(strict 模式)
├── run-all.ts                # 依次运行所有示例
├── .vscode/
│   └── launch.json           # VSCode 调试配置(tsx 调试当前文件)
└── src/
    ├── basic/                        # 基础课程 01-12(平铺)
    │   ├── 01-typescript-basics.ts       # TS 是什么:注解、推断、类型擦除
    │   ├── 02-primitive-types.ts         # 原始类型 + 字面量类型 + any/unknown/never
    │   ├── 03-type-inference.ts          # 类型推断:宽化、上下文、as const、satisfies
    │   ├── 04-functions.ts               # 函数:可选/默认参数、函数类型、重载
    │   ├── 05-objects-and-interfaces.ts  # 对象:interface/type、readonly、继承、交叉
    │   ├── 06-arrays-and-tuples.ts       # 数组与元组:泛型方法、readonly、多维
    │   ├── 07-unions-and-narrowing.ts    # 联合类型:typeof/in 收窄、判别联合
    │   ├── 08-enums.ts                   # 枚举:数字/字符串/const enum
    │   ├── 09-generics.ts                # 泛型:约束、keyof、默认值
    │   ├── 10-classes.ts                 # 类:修饰符、参数属性、抽象类、implements
    │   ├── 11-utility-types.ts           # 工具类型:Partial/Pick/Omit/Record/Awaited...
    │   └── 12-async-await.ts             # 异步类型:Promise<T>、并发、错误收窄
    └── import/                      # 模块专题(子目录,带演示模块)
        ├── 13-modules.ts            # import/export、import type、桶文件、动态导入
        └── modules/                 # 被 13-modules.ts 导入的示例模块
```

## 使用方法

```bash
# 运行单个示例(tsx 直接运行 .ts,无需预编译)
npm run start        # 01 基础
npm run primitives   # 02 原始类型
npm run inference    # 03 类型推断
npm run functions    # 04 函数
npm run objects      # 05 对象与接口
npm run arrays       # 06 数组与元组
npm run unions       # 07 联合类型与收窄
npm run enums        # 08 枚举
npm run generics     # 09 泛型
npm run classes      # 10 类
npm run utilities    # 11 工具类型
npm run async        # 12 异步编程
npm run modules      # 13 模块系统

# 依次运行所有示例
npm run all

# 全项目类型检查(编译不产出文件,只做校验)
npm run typecheck
```

## 学习顺序建议

1. `basic/01-typescript-basics.ts` — TS 是什么、类型注解、编译期 vs 运行期
2. `basic/02-primitive-types.ts` — 7 种原始类型、字面量类型、any/unknown/never/void、类型断言
3. `basic/03-type-inference.ts` — 推断规则、宽化、`as const`、`satisfies`
4. `basic/04-functions.ts` — 参数/返回值注解、可选/默认/剩余参数、函数类型、重载
5. `basic/05-objects-and-interfaces.ts` — 对象形状、interface vs type、readonly、索引签名、继承与交叉
6. `basic/06-arrays-and-tuples.ts` — 数组注解、元组、readonly、多维数组
7. `basic/07-unions-and-narrowing.ts` — 联合类型、typeof/in 收窄、判别联合、never 穷尽检查
8. `basic/08-enums.ts` — 数字/字符串/const 枚举、枚举与联合类型的取舍
9. `basic/09-generics.ts` — 类型参数、约束、keyof、默认值
10. `basic/10-classes.ts` — 访问修饰符、参数属性、getter/setter、继承、抽象类
11. `basic/11-utility-types.ts` — Partial/Required/Readonly/Pick/Omit/Record/ReturnType/Parameters/Awaited/Exclude/Extract/NonNullable
12. `basic/12-async-await.ts` — Promise<T>、await 拆箱、并发、错误收窄、泛型请求
13. `import/13-modules.ts` — 命名/默认/重命名/import type/桶文件/副作用/动态导入

## 关键提示

- `tsconfig.json` 开启了 `strict` 模式——TS 的核心价值所在,不要关闭
- `tsx` 直接运行 `.ts` 文件,开发期无需编译;`npm run typecheck` 用 `tsc --noEmit` 做纯类型校验
- ES Module 模式(`type: "module"`),用 `import` / `export`,而不是 `require`
- 默认使用 `const`,需要重新赋值时才用 `let`,不用 `var`
- 少用 `any`,多用 `unknown` + 收窄;能用 `as const` / `satisfies` 的地方别用断言
- VSCode 中打开任意 `.ts` 文件按 F5,可直接断点调试(launch.json 已配置 tsx)

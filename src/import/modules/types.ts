// 演示:类型也可以导出/导入

// 1. 导出类型信息
export interface User {
  id: number;
  name: string;
}

// 2. 导出联合类型信息
export type ID = string | number;

// 枚举是「值+类型」双身份,普通导出 (即不仅导出了枚举类型信息,还导出了值)
export enum Role {
  Admin = 'admin',
  User = 'user',
}

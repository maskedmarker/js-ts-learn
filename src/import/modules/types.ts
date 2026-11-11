// 演示:类型也可以导出/导入

export interface User {
  id: number;
  name: string;
}

export type ID = string | number;

// 枚举是「值+类型」双身份,普通导出
export enum Role {
  Admin = 'admin',
  User = 'user',
}

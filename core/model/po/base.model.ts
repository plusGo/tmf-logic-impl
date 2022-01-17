export interface BaseModel {
  id: string;
  createAt?: number; // 创建时间
  createBy?: string; // 创建人
  createIP?: string; // 创建IP
  updateAt?: number; // 修改时间
  updateIP?: string; // 修改IP
  updateBy?: string; // 修改人
}

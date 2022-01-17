/**
 * 创建属性与属性值时的模型
 */
export interface AttrSaveRequest {
  name: string;
  desc: string;
  values: { value: string; desc: string }[];
}

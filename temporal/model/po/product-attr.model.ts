import { BaseModel } from '../../../core/model/po/base.model';

/**
 * 销售属性
 */
export interface ProductAttr extends BaseModel {
  id: string;
  name: string; // 销售属性名称
  desc: string; // 销售属性描述
}

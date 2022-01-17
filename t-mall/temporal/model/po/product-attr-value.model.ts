import { BaseModel } from '../../../../core/model/po/base.model';

/**
 * 销售属性值
 */
export interface ProductAttrValue extends BaseModel {
  id: string;
  attrId: string;
  value: string; // 销售属性值
  desc: string; // 销售属性值描述
}

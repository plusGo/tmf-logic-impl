import { BaseModel } from '../../../core/model/po/base.model';

/**
 * 销售属性
 */
export interface ProductSpuSkuAttrMap extends BaseModel {
  id: string;
  spuId: string;
  skuId: string;
  attrId: string;
  attrName: string;
  attr_value_id: string;
  attr_value_name: string; // 销售属性值
}

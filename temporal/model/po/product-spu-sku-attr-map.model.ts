import { BaseModel } from '../../../core/model/po/base.model';

/**
 * -- 关联关系冗余表 product_spu_sku_attr_map
 -- 1. spu下 有哪些sku
 -- 2. spu下 有那些销售属性
 -- 3. spu下 每个销售属性对应的销售属性值(一对多)
 -- 4. spu下 每个销售属性值对应的sku(一对多)
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

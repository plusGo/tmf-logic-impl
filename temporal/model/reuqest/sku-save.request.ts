/**
 * 创建产品sku时的模型
 */
import { ProductSpu } from '../po/product-spu.model';
import { ProductAttrValue } from '../po/product-attr-value.model';

export interface SkuSaveRequest {
  spu: ProductSpu;
  name: string;
  attrValues: ProductAttrValue[];
  price: string;
  marketPrice: string;
  quantity: number; // 库存
}

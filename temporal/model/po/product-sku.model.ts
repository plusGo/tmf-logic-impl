import { BaseModel } from '../../../core/model/po/base.model';

/**
 * 库存量单位
 */
export interface ProductSku extends BaseModel {
  id: string;
  spuId: string;
  attrs: string; // 销售属性值{attrValueId}-{attrValueId} 多个销售属性值逗号分隔
  priceFree: number; // 售价，整数方式保存
  priceScale: number; // 售价，金额对应的小数位数
  marketPriceFree: number; // 市场价,整数方式保存
  marketPriceScale: number; // 市场价，金额对应的小数位数
}

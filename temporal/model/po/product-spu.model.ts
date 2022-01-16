import { BaseModel } from '../../../core/model/po/base.model';

/**
 * 标准产品单位
 */
export interface ProductSpu extends BaseModel {
  id: string;
  brandId: string; // 品牌ID
  categoryId: string; // 分类ID
  name: string; // spu名称
  desc: string; // spu描述
  sellingPoint: string; // 卖点
  unit: string; // spu单位
  priceFree: number; // 售价，整数方式保存
  priceScale: number;// 售价，金额对应的小数位数
  marketPriceFree: number; // 市场价,整数方式保存
  marketPriceScale: number;// 市场价，金额对应的小数位数

}

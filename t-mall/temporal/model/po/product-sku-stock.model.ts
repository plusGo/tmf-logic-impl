import { BaseModel } from '../../../../core/model/po/base.model';

/**
 * sku库存表
 */
export interface ProductSkuStock extends BaseModel {
  id: string;
  skuId: string;
  quantity: number; // 库存
}

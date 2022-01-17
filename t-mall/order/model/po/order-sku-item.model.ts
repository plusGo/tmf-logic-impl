/**
 * 订单
 */
import { BaseModel } from '../../../../core/model/po/base.model';

export interface OrderSkuItem extends BaseModel {
  orderId: string; // 订单号
  skuId: string;
  quantity: number;
}

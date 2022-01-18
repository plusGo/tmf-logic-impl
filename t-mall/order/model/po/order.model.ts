/**
 * 订单
 */
import { BaseModel } from '../../../../core/model/po/base.model';
import { OrderStatus } from '../enum/order-status.enum';

export interface Order extends BaseModel {
  orderId: string; // 订单号
  skusAmount: number; // 商品的总金额
  promotionAmount?: number; // 优惠的总金额
  freight?: number; // 运费
  finalAmount: number; // 支付的总金额
  status: OrderStatus; // 订单状态
}

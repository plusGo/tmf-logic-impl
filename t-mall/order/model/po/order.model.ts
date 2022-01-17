/**
 * 订单
 */
import { BaseModel } from '../../../../core/model/po/base.model';
import { OrderStatus } from '../enum/order-status.enum';

export interface Order extends BaseModel {
  orderId: string; // 订单号
  skusAmount: number; // 商品的总金额
  promotionAmount: string; // 优惠的总金额
  freight: string; // 优惠的总金额
  finalAmount: string; // 支付的总金额
  status: OrderStatus; // 订单状态
}

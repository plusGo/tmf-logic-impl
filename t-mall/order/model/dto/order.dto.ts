import { OrderStatus } from '../enum/order-status.enum';
import { BaseModel } from '../../../../core/model/po/base.model';
import { OrderAddressDto } from './order-address.dto';
import { OrderSkuDto } from './order-sku-item.dto';

export interface OrderDto extends BaseModel {
  orderId: string; // 订单号
  promotionAmount?: number; // 优惠的总金额
  freight?: number; // 邮寄费
  skusAmount: number; // 商品的总金额
  finalAmount: number; // 支付的总金额
  status: OrderStatus; // 订单状态
  address: OrderAddressDto;
  skuItems: OrderSkuDto[];
}

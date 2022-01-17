import { OrderStatus } from './enum/order-status.enum';
import { BaseModel } from '../../../core/model/po/base.model';

export interface OrderDto extends BaseModel {
  orderId: string; // 订单号
  skusAmount: string; // 商品的总金额
  promotionAmount: string; // 优惠的总金额
  freight: string; // 邮寄费
  finalAmount: string; // 支付的总金额
  status: OrderStatus; // 订单状态
  address: OrderAddressDto;
  skuItems: OrderSkuDto[];
}

interface OrderSkuDto {
  skuId: string;
  quantity: number;
}

interface OrderAddressDto {
  address: string; // 订单寄送的地址
  consignee: string; // 收货人姓名
  email: string; // 收货人邮箱
  phone: string; // 收货人手机号
}

import { OrderAddressDto } from '../dto/order-address.dto';
import { OrderSkuDto } from '../dto/order-sku-item.dto';

export interface OrderSaveRequest {
  promotionAmount?: number; // 优惠的总金额
  freight?: number; // 邮寄费
  skusAmount: number; // 商品的总金额
  finalAmount: number; // 支付的总金额
  address: OrderAddressDto;
  skuItems: OrderSkuDto[];
}

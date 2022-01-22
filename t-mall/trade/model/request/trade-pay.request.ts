import { CurrencyCode } from '../enum/currency-code.enum';
import { SignType } from '../enum/sign-type.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { PayMethod } from '../enum/pay-method.enum';

/**
 * 创建支付订单
 */
export interface TradePayRequest {
  appId: string; // 第三方应用的ID
  appOrderId: string; //应用方订单号
  totalFree: number; //支付金额
  scale: number; // 金额对应的小数位数
  currencyCode: CurrencyCode.CNY; //交易的币种
  expireTime: number; //订单过期时间
  phone: string; //用户的电话
  signType: SignType; //采用的加签算法
  orderStatus: OrderStatus;
  payMethod: PayMethod; // 支付方式
}

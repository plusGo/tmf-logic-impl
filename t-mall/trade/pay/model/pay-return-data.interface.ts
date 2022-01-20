import { PayMethod } from '../../model/enum/pay-method.enum';

export interface PayReturnDataInterface {
  tradeNo: string; // 第三方的流水号
  appOrderId: string; // 应用方的商品订单号
  scale: number; // 金额对应的小数位数
  totalFree: number; // 支付金额
  expireTime: number; // 订单过期时间，也可用作支付过期时间
  paymentTime: number; // 用户支付成功的时间
  payMethod: PayMethod; // 支付方式
  payChannel: string; // 选择的支付渠道，如支付宝中的花呗、信用卡等
}

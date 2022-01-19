import { PayMethod } from '../../model/enum/pay-method.enum';

export interface PayParamsInterface {
  transactionId: string; // 内部交易系统的交易流水ID
  totalFree: number; // 支付金额
  scale: number; // 金额对应的小数位数
  expireTime: number; // 订单过期时间，也可用作支付过期时间
  appOrderId: string; // 应用方的商品订单号
  payMethod: PayMethod; // 支付方式
}

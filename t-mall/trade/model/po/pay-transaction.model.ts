import { PayMethod } from '../enum/pay-method.enum';
import { CurrencyCode } from '../enum/currency-code.enum';
import { SignType } from '../enum/sign-type.enum';
import { OrderStatus } from '../enum/order-status.enum';
import { BaseModel } from '../../../../core/model/po/base.model';

/**
 *  支付流水
 *  @description 记录所有的交易数据
 */
export interface PayTransaction extends BaseModel {
  id: string;
  appId: string; // 第三方应用的ID
  payMethod: PayMethod; // 支付方式
  appOrderId: string; //应用方订单号
  transactionId: string; //本次交易唯一id，整个支付系统唯一，生成他的原因主要是 order_id对于其它应用来说可能重复
  totalFree: number; //支付金额
  scale: number; // 金额对应的小数位数
  currencyCode: CurrencyCode; //交易的币种
  payChannel: string; // 选择的支付渠道，如支付宝中的花呗、信用卡等
  expireTime: number; //订单过期时间
  returnUrl?: string; // 支付后跳转的URL
  notifyUrl?: string; //支付后异步通知的URL
  phone: string; //用户的电话
  signType: SignType; //采用的加签算法
  paymentTime: number; // 第三方支付成功的时间
  notifyTime: number; // 收到异步通知的时间
  finishTime: number; // 通知上游系统的时间
  tradeNo: string; // 第三方的流水号
  transactionCode?: string; // 真实给第三方的交易code，异步通知的时候更新
  orderStatus: OrderStatus;
}

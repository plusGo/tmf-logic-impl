import { BaseModel } from '../../../../core/model/po/base.model';
import { PayMethod } from '../enum/pay-method.enum';
import { CurrencyCode } from '../enum/currency-code.enum';
import { RefundType } from '../enum/refund-type.enum';
import { RefundMethod } from '../enum/refund-method.enum';
import { RefundStatus } from '../enum/refund-status.enum';

/**
 *  pay-log-data.trade.ts
 *  @description 记录所有的退款数据
 */
export interface PayRefund extends BaseModel {
  id: string;
  appId: string; // 第三方应用的ID
  appRefundNo: string; // 上游的退款ID
  transactionId: string; // 系统唯一交易ID
  trade_no: string; // 第三方的流水号
  refundNo: string; // 支付平台生成的唯一的退款单号
  payMethod: PayMethod; // 支付方式
  payChannel: string; //选择的支付渠道，如支付宝中的花呗、信用卡等
  refundFree: number; // 退款金额
  scale: number; // 金额对应的小数位数
  refundReason: string; // 退款理由
  currencyCode: CurrencyCode; //交易的币种
  refundType: RefundType; // 退款类型
  refundMethod: RefundMethod; // 退款方式
  refundStatus: RefundStatus; // 退款方式
}

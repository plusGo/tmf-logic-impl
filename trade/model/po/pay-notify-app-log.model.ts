import { BaseModel } from '../../../core/model/po/base.model';
import { PayMethod } from '../enum/pay-method.enum';
import { SignType } from '../enum/sign-type.enum';
import { NotifyType } from '../enum/notify-type.enum';
import { NotifyStatus } from '../enum/notify-status.enum';

/**
 *  通知应用程序的日志
 *  @description 通知上游应用日志
 */
export interface PayNotifyAppLog extends BaseModel {
  id: string;
  appId: string; // 第三方应用的ID
  payMethod: PayMethod;// 支付方式
  transactionId: string;// 系统唯一交易ID
  transaction_code: string;// 真实给第三方的交易code，异步通知的时候更新
  signType: SignType;//采用的加签算法
  totalFree: number;//支付金额
  scale: number;// 金额对应的小数位数
  payChannel: string;//选择的支付渠道，如支付宝中的花呗、信用卡等
  trade_no: string;// 第三方的流水号
  paymentTime: number;// 第三方支付成功的时间
  notifyType: NotifyType;
  notifyStatus: NotifyStatus;
}

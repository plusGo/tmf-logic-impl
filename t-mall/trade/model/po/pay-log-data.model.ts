import { BaseModel } from '../../../../core/model/po/base.model';
import { LogType } from '../enum/log-type.enum';

/**
 *  交易系统全部日志
 *  @description 所有的日志数据，如：支付请求、退款请求、异步通知等
 */
export interface PayLogData extends BaseModel {
  id: string;
  appId: string; // 第三方应用的ID
  appOrderId: string; //应用方订单号
  transactionId: string; // 系统唯一交易ID
  requestHeader: string; // 请求的header头
  requestParams: string; // 支付的请求参数
  logType: LogType; // 日志类型
}

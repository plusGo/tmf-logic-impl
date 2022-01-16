import { BaseModel } from '../../../core/model/po/base.model';
import { PayMethod } from '../enum/pay-method.enum';

/**
 *  交易扩展
 *  @description 记录每次向第三方发起交易时，生成的交易号
 */
export interface PayTransactionExtension extends BaseModel {
  id: string;
  transactionId: string;// 系统唯一交易ID
  payMethod: PayMethod;// 支付方式
  transaction_code: string;// 生成传输给第三方的订单号
  callNum: number;// 发起调用的次数
  extensionData: string; // 扩展内容，需要保存：transaction_code 与 trade no 的映射关系，异步通知的时候填充
}

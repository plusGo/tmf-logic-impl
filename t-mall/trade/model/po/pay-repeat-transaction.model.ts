import { BaseModel } from '../../../../core/model/po/base.model';
import { PayMethod } from '../enum/pay-method.enum';
import { CurrencyCode } from '../enum/currency-code.enum';
import { RepeatType } from '../enum/repeat-type.enum';
import { RepeatStatus } from '../enum/repeat-status.enum';

/**
 *  重复支付的交易
 *  @description 重复支付的数据
 */
export interface PayRepeatTransaction extends BaseModel {
  id: string;
  appId: string; // 第三方应用的ID
  transactionId: string; // 系统唯一交易ID
  transaction_code: string; // 支付成功时，该笔交易的code
  trade_no: string; // 第三方对应的交易号
  payMethod: PayMethod; // 支付方式
  totalFree: number; //支付金额
  scale: number; // 金额对应的小数位数
  currencyCode: CurrencyCode; //交易的币种
  paymentTime: number; // 第三方支付成功的时间
  repeatType: RepeatType;
  repeatStatus: RepeatStatus;
}

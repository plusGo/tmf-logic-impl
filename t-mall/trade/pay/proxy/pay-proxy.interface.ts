import { PayParamsInterface } from '../model/pay-params.interface';
import { PayReturnDataInterface } from '../model/pay-return-data.interface';

/**
 * 第三方支付的抽象接口
 */
export interface PayProxyInterface {
  pay(params: PayParamsInterface): void;

  buildStandardReturnData(params: any): PayReturnDataInterface;
}

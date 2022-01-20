import { inject, Injectable } from '../../../../core/util/bean-factory';
import { PayContext } from '../context/pay-context';
import { PayMethod } from '../../model/enum/pay-method.enum';
import { PayParamsInterface } from '../model/pay-params.interface';
import { PayReturnDataInterface } from '../model/pay-return-data.interface';

@Injectable()
export class OpenPayService {
  payContext = inject<PayContext>(PayContext);

  /**
   * 处理第三方支付的回调
   */
  buildStandardReturnData(payMethod: PayMethod, response: any): PayReturnDataInterface {
    const payProxy = this.payContext.getProxy(payMethod);
    return payProxy.buildStandardReturnData(response);
  }

  /**
   * 发起第三方支付
   */
  pay(payMethod: PayMethod, request: PayParamsInterface): void {
    const payProxy = this.payContext.getProxy(payMethod);
    payProxy.pay(request);
  }
}

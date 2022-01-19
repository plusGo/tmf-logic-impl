import { inject, Injectable } from '../../../core/util/bean-factory';
import { PayContext } from '../pay/context/pay-context';
import { PayMethod } from '../model/enum/pay-method.enum';

/**
 * 提供给第三方支付的回调接口
 */
@Injectable()
export class OpenPayNotifyController {
  payContext = inject<PayContext>(PayContext);

  public openPayNotidy(payMethod: PayMethod, response: any): void {
    return this.payContext.openPayNotify(payMethod, response);
  }
}

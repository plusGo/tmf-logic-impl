import { inject, Injectable } from '../../../../core/util/bean-factory';
import { PayMethod } from '../../model/enum/pay-method.enum';
import { AliPayProxy } from '../proxy/ali-pay-proxy.class';
import { PayProxyInterface } from '../proxy/pay-proxy.interface';

@Injectable()
export class PayContext {
  aliPayProxy = inject<AliPayProxy>(AliPayProxy);

  getProxy(payMethod: PayMethod): PayProxyInterface {
    if (payMethod === PayMethod.ALI_PAY) {
      return this.aliPayProxy;
    } else if (payMethod === PayMethod.CMB_PAY) {
      return this.aliPayProxy;
    } else if (payMethod === PayMethod.WECHAT_PAY) {
      return this.aliPayProxy;
    } else {
      throw new Error('无对应的支付模式');
    }
  }
}

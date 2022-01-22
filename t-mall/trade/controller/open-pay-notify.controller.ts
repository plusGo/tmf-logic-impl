import { inject, Injectable } from '../../../core/util/bean-factory';
import { PayMethod } from '../model/enum/pay-method.enum';
import { TradeService } from '../service/trade.service';

/**
 * 提供给第三方支付的回调接口
 */
@Injectable()
export class OpenPayNotifyController {
  public openPayNotify(payMethod: PayMethod, response: any): void {
    return inject<TradeService>(TradeService).openPayNotify(payMethod, response);
  }
}

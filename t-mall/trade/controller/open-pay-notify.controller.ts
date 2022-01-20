import { inject, Injectable } from '../../../core/util/bean-factory';
import { PayContext } from '../pay/context/pay-context';
import { PayMethod } from '../model/enum/pay-method.enum';
import { TradeService } from '../service/trade.service';

/**
 * 提供给第三方支付的回调接口
 */
@Injectable()
export class OpenPayNotifyController {
  tradeService = inject<TradeService>(TradeService);

  public openPayNotify(payMethod: PayMethod, response: any): void {
    return this.tradeService.openPayNotify(payMethod, response);
  }
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { TradeService } from '../service/trade.service';
import { TradePayRequest } from '../model/request/trade-pay.request';
import { PayTransaction } from '../model/po/pay-transaction.model';

@Injectable()
export class TradeController {
  tradeService = inject<TradeService>(TradeService);

  /**
   *  发起支付
   */
  public pay(tradePayRequest: TradePayRequest): Promise<PayTransaction> {
    return this.tradeService.pay(tradePayRequest);
  }

  /**
   *  发起退款
   */
  public refund(): void {
  }

  /**
   *  接口异步通知
   */
  public notify(channel: string, sellerTradeNumber: string): void {
  }

  /**
   *  接口同步通知
   */
  public return(channel: string, sellerTradeNumber: string): void {
  }

  /**
   *  交易查询
   */
  public queryTrade(): void {
  }

  /**
   *  退款查询
   */
  public queryRefund(): void {
  }

  /**
   *  账单获取
   */
  public queryBill(): void {
  }

  /**
   *  结算明细获取
   */
  public querySettle(): void {
  }
}

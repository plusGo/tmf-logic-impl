import { Injectable } from '../../../core/util/bean-factory';
import { Logger } from '../../../core/util/logger';
import { IdUtil } from '../../../core/util/id.util';

@Injectable()
export class TradeController {
  /**
   *  发起支付
   */
  public goPay(): void {
    Logger.log('TradeController', '发起支付了', IdUtil.UUID());
  }

  /**
   *  发起退款
   */
  public refund(): void {}

  /**
   *  接口异步通知
   */
  public notify(channel: string, sellerTradeNumber: string): void {}

  /**
   *  接口同步通知
   */
  public return(channel: string, sellerTradeNumber: string): void {}

  /**
   *  交易查询
   */
  public queryTrade(): void {}

  /**
   *  退款查询
   */
  public queryRefund(): void {}

  /**
   *  账单获取
   */
  public queryBill(): void {}

  /**
   *  结算明细获取
   */
  public querySettle(): void {}
}

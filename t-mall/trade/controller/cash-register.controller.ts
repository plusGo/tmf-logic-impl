import { inject, Injectable } from '../../../core/util/bean-factory';
import { OrderDto } from '../../order/model/dto/order.dto';
import { CashRegisterService } from '../service/cash-register.service';
import { CashRegisterModel } from '../model/dto/cash-register.model';
import { AliPayResponse } from '../../../fake-pay/ali-pay/model/response/ali-pay.response';

@Injectable()
export class CashRegisterController {
  cashRegisterService = inject<CashRegisterService>(CashRegisterService);

  /**
   *  发起支付
   */
  public goPay(goodsOrder: OrderDto): CashRegisterModel {
    return this.cashRegisterService.goPay(goodsOrder);
  }

  /**
   *  阿里支付回调
   */
  public aliPayNotify(res: AliPayResponse): void {
    return this.cashRegisterService.aliPayNotify(res);
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

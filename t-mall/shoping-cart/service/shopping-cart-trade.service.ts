import { inject, Injectable } from '../../../core/util/bean-factory';
import { TokenUtil } from '../../../core/util/token.util';
import { UserToken } from '../../../core/model/dto/user-token.model';
import { OrderDto } from '../../order/model/dto/order.dto';
import { CurrencyCode } from '../../trade/model/enum/currency-code.enum';
import { SignType } from '../../trade/model/enum/sign-type.enum';
import { OrderStatus } from '../../trade/model/enum/order-status.enum';
import { PayMethod } from '../../trade/model/enum/pay-method.enum';
import { PriceUtil } from '../../../core/util/price.util';
import { DateUtil } from '../../../core/util/date.util';
import { TradeController } from '../../trade/controller/trade.controller';
import { PayTransaction } from '../../trade/model/po/pay-transaction.model';

@Injectable()
export class ShoppingCartTradeService {
  private tradeController: TradeController = inject(TradeController);

  public trade(order: OrderDto): Promise<PayTransaction> {
    const curUser = TokenUtil.getCurrentUser() as UserToken;
    const tradeReq = {
      appId: 't-mall', // 第三方应用的ID
      appOrderId: order.orderId, //应用方订单号
      totalFree: PriceUtil.transformToNumber(order.finalAmount + '')[0], //支付金额
      scale: PriceUtil.transformToNumber(order.finalAmount + '')[1], // 金额对应的小数位数
      currencyCode: CurrencyCode.CNY, //交易的币种
      expireTime: DateUtil.plusMinutes(new Date().getTime(), 30), //订单过期时间
      phone: curUser.phone as string, //用户的电话
      signType: SignType.MD5, //采用的加签算法
      orderStatus: OrderStatus.WAIT_START_PAY,
      payMethod: PayMethod.ALI_PAY, // 支付方式
    };
    return this.tradeController.pay(tradeReq);
  }
}

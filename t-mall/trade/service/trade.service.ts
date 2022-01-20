import { inject, Injectable } from '../../../core/util/bean-factory';
import { Logger } from '../../../core/util/logger';
import { IdUtil } from '../../../core/util/id.util';
import { OrderDto } from '../../order/model/dto/order.dto';
import { CashRegisterModel } from '../model/dto/cash-register.model';
import { PayTransaction } from '../model/po/pay-transaction.model';
import { CurrencyCode } from '../model/enum/currency-code.enum';
import { SignType } from '../model/enum/sign-type.enum';
import { OrderStatus } from '../model/enum/order-status.enum';
import { PriceUtil } from '../../../core/util/price.util';
import { DateUtil } from '../../../core/util/date.util';
import { PayTransactionRepository } from '../dao/pay-transaction.repository';
import { AliPayResponse } from '../../../fake-pay/ali-pay/model/response/ali-pay.response';
import { PayMethod } from '../model/enum/pay-method.enum';
import { OpenPayService } from '../pay/service/open-pay.service';

@Injectable()
export class TradeService {
  payTransactionRepository = inject<PayTransactionRepository>(PayTransactionRepository);
  openPayService = inject<OpenPayService>(OpenPayService);

  public goPay(goodsOrder: OrderDto): CashRegisterModel {
    Logger.log('TradeService', '发起了支付', IdUtil.UUID());

    const newPayTransaction: Partial<PayTransaction> = {
      id: IdUtil.UUID(),
      appOrderId: goodsOrder.orderId, //应用方订单号
      transactionId: IdUtil.UUID(), //本次交易唯一id，整个支付系统唯一，生成他的原因主要是 order_id对于其它应用来说可能重复
      totalFree: PriceUtil.transformToNumber(goodsOrder.finalAmount + '')[0], //支付金额
      scale: PriceUtil.transformToNumber(goodsOrder.finalAmount + '')[1], // 金额对应的小数位数
      currencyCode: CurrencyCode.CNY, //交易的币种
      expireTime: DateUtil.plusMinutes(new Date().getTime(), 30), //订单过期时间
      phone: goodsOrder.address.phone, //用户的邮箱
      signType: SignType.MD5, //采用的加签算法
      orderStatus: OrderStatus.WAIT_START_PAY,
    };
    this.payTransactionRepository.save(newPayTransaction as any);

    const cashRegisterModel = new CashRegisterModel(newPayTransaction as PayTransaction);
    return cashRegisterModel;
  }

  aliPayNotify(res: AliPayResponse): void {
    debugger;
    const transaction = this.payTransactionRepository.queryOne([
      {
        field: 'appOrderId',
        value: res.appOrderId,
      },
    ]) as PayTransaction;
    const updateValue: Partial<PayTransaction> = {
      payMethod: PayMethod.ALI_PAY,
      payChannel: '信用卡',
    };
    this.payTransactionRepository.updateOne(transaction.id, updateValue);
  }

  openPayNotify(payMethod: PayMethod, response: any): void {
    this.openPayService.buildStandardReturnData();
  }
}

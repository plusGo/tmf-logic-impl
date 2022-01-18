/**
 *  收银台模型，模拟用户在收银台的操作
 */
import { PayTransaction } from '../po/pay-transaction.model';
import { inject } from '../../../../core/util/bean-factory';
import { PayTransactionRepository } from '../../dao/pay-transaction.repository';
import { AliPayController } from '../../../../fake-pay/ali-pay/controller/ali-pay.controller';
import { AliPayRequest } from '../../../../fake-pay/ali-pay/model/request/ali-pay.request';
import { PriceUtil } from '../../../../core/util/price.util';
import { AliPayResponse } from '../../../../fake-pay/ali-pay/model/response/ali-pay.response';
import { CashRegisterController } from '../../controller/cash-register.controller';

export class CashRegisterModel {
  aliPayController = inject<AliPayController>(AliPayController);
  cashRegisterController = inject<CashRegisterController>(CashRegisterController);

  constructor(private payTransaction: PayTransaction) {
    this.payTransaction = payTransaction;
  }

  /**
   *  获取支付剩余时间,单位秒
   */
  getTimeRemaining(): number {
    return (this.payTransaction.expireTime - new Date().getTime()) / 1000;
  }

  /**
   * 支付宝
   */
  aliPay() {
    const notifyCallback = (res: AliPayResponse) => {
      this.cashRegisterController.aliPayNotify(res);
    };
    const req: AliPayRequest = {
      sellerTradeNumber: '1111111', // 在支付宝中注册的商户交易号
      totalAmount: PriceUtil.transformToString(this.payTransaction.totalFree, this.payTransaction.scale), // 支付金额
      notifyCallback,
      subject: 'tmf-logic-impl', // 订单标题
      appOrderId: this.payTransaction.appOrderId, // 商户的订单号
    };
    this.aliPayController.pay(req);
  }

  /**
   * 微信
   */
  wechatPay() {}
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { IdUtil } from '../../../core/util/id.util';
import { PayTransaction } from '../model/po/pay-transaction.model';
import { OrderStatus } from '../model/enum/order-status.enum';
import { PayTransactionRepository } from '../dao/pay-transaction.repository';
import { PayMethod } from '../model/enum/pay-method.enum';
import { OpenPayService } from '../pay/service/open-pay.service';
import { TradePayRequest } from '../model/request/trade-pay.request';
import { PayLogData } from '../model/po/pay-log-data.model';
import { LogType } from '../model/enum/log-type.enum';
import { PayLogDataRepository } from '../dao/pay-log-data.repository';
import { PayParamsInterface } from '../pay/model/pay-params.interface';
import { Logger } from '../../../core/util/logger';

@Injectable()
export class TradeService {
  callBackCache: { [key: string]: (newTransaction: PayTransaction) => void } = {};
  payTransactionRepository = inject<PayTransactionRepository>(PayTransactionRepository);
  payLogDataRepository = inject<PayLogDataRepository>(PayLogDataRepository);
  openPayService = inject<OpenPayService>(OpenPayService);

  pay(tradePayRequest: TradePayRequest): Promise<PayTransaction> {
    Logger.log('TradeService', '发起支付', '请求内容', JSON.stringify(tradePayRequest));

    const transactionId = IdUtil.UUID();
    // 打日志
    const newPayLog: PayLogData = {
      id: IdUtil.UUID(),
      appId: tradePayRequest.appId, // 第三方应用的ID
      appOrderId: tradePayRequest.appOrderId, //应用方订单号
      transactionId: transactionId, // 系统唯一交易ID
      requestHeader: '', // 请求的header头
      requestParams: JSON.stringify(tradePayRequest), // 支付的请求参数
      logType: LogType.PAYMENT, // 日志类型
    };
    this.payLogDataRepository.save(newPayLog);

    // 生成流水
    const newPayTransaction: Partial<PayTransaction> = {
      id: IdUtil.UUID(),
      appOrderId: tradePayRequest.appOrderId, //应用方订单号
      transactionId: transactionId, //本次交易唯一id，整个支付系统唯一，生成他的原因主要是 order_id对于其它应用来说可能重复
      totalFree: tradePayRequest.totalFree, //支付金额
      scale: tradePayRequest.scale, // 金额对应的小数位数
      currencyCode: tradePayRequest.currencyCode, //交易的币种
      expireTime: tradePayRequest.expireTime, //订单过期时间
      phone: tradePayRequest.phone, //用户的邮箱
      signType: tradePayRequest.signType, //采用的加签算法
      orderStatus: OrderStatus.WAIT_START_PAY,
    };
    this.payTransactionRepository.save(newPayTransaction as PayTransaction);

    // 发起第三方支付
    const openPayRequest: PayParamsInterface = {
      transactionId: transactionId, // 内部交易系统的交易流水ID
      totalFree: tradePayRequest.totalFree, // 支付金额
      scale: tradePayRequest.scale, // 金额对应的小数位数
      expireTime: tradePayRequest.expireTime, // 订单过期时间，也可用作支付过期时间
      appOrderId: tradePayRequest.appOrderId, // 应用方的商品订单号
      payMethod: tradePayRequest.payMethod, // 支付方式
    };
    this.openPayService.pay(tradePayRequest.payMethod, openPayRequest);


    return new Promise<PayTransaction>((resolve) => {
      this.callBackCache[newPayTransaction.appOrderId as string] = (newTransaction: PayTransaction) => {
        resolve(newTransaction);
      };
    });
  }

  openPayNotify(payMethod: PayMethod, response: any): void {
    Logger.log('TradeService', `收到第三方${payMethod}支付发起的回调`, '回调内容', JSON.stringify(response));
    const standardReturnData = this.openPayService.buildStandardReturnData(payMethod, response);
    // 找到目标订单
    const payTransaction = this.payTransactionRepository.queryOne([{
      field: 'appOrderId',
      value: standardReturnData.appOrderId,
    }]) as PayTransaction;
    this.payTransactionRepository.updateOne(payTransaction.id, {
      tradeNo: standardReturnData.tradeNo,
      payChannel: standardReturnData.payChannel,
      paymentTime: standardReturnData.paymentTime,
      notifyTime: new Date().getTime(),
      finishTime: new Date().getTime(),
      orderStatus: OrderStatus.COMPLETE_PAY,
    });
    const newPayTransaction = this.payTransactionRepository.findById(payTransaction.id) as PayTransaction;

    const callBack = this.callBackCache[standardReturnData.appOrderId] as any;
    if (callBack) {
      callBack(newPayTransaction);
    }
  }


}

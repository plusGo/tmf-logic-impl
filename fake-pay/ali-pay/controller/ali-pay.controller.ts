import { AliPayRequest } from '../model/request/ali-pay.request';
import { AliPayResponse } from '../model/response/ali-pay.response';
import { IdUtil } from '../../../core/util/id.util';

export class AliPayController {
  public pay(request: AliPayRequest): void {
    const response: AliPayResponse = {
      sellerTradeNumber: request.sellerTradeNumber,
      totalAmount: request.totalAmount,
      paymentTime: new Date().getTime(),
      appOrderId: request.appOrderId,
      tradeNo: IdUtil.UUID(),
    };
    setTimeout(() => {
      if (request && !!request.notifyCallback) {
        request.notifyCallback(response);
      }
    }, 3000);
  }
}

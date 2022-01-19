import { PayProxyInterface } from './pay-proxy.interface';
import { PayReturnDataInterface } from '../model/pay-return-data.interface';
import { PayParamsInterface } from '../model/pay-params.interface';
import { AliPayGateway, AliPayRequest, AliPayResponse } from '../gateway/ali-pay.gateway';
import { inject } from '../../../../core/util/bean-factory';
import { PriceUtil } from '../../../../core/util/price.util';
import { OpenPayNotifyController } from '../../controller/open-pay-notify.controller';
import { PayMethod } from '../../model/enum/pay-method.enum';

const ALI_PAY_CONFIG = {
  app_id: '8eff147c-acd2-4931-be62-e87e27699078',
};

export class AliPayProxy implements PayProxyInterface {
  aliPayGateway = inject<AliPayGateway>(AliPayGateway);
  openPayNotifyController = inject<OpenPayNotifyController>(OpenPayNotifyController);

  pay(params: PayParamsInterface): void {
    const aliPayReq: AliPayRequest = {
      app_id: ALI_PAY_CONFIG.app_id, // 支付宝分配给开发者的应用ID
      out_trade_no: params.appOrderId, // 商户订单号。由商家自定义，64个字符以内，仅支持字母、数字、下划线且需保证在商户端不重复
      total_amount: PriceUtil.transformToString(params.totalFree, params.scale), // 订单总金额，单位为元
      time_expire: params.expireTime, // 过期时间
      notify_callback: (res: any) => {
        this.openPayNotifyController.openPayNotidy(PayMethod.ALI_PAY, res);
      },
    };
    this.aliPayGateway.alipay(aliPayReq);
  }

  buildStandardReturnData(params: AliPayResponse): PayReturnDataInterface {
    return {
      tradeNo: params.trade_no, // 第三方的流水号
      appOrderId: params.out_trade_no, // 应用方的商品订单号
      scale: PriceUtil.transformToNumber(params.total_amount)[0], // 金额对应的小数位数
      totalFree: PriceUtil.transformToNumber(params.total_amount)[1],
      expireTime: params.time_expire, // 订单过期时间，也可用作支付过期时间
      paymentTime: params.payment_time, // 用户支付成功的时间
      payMethod: PayMethod.ALI_PAY, // 支付方式
    };
  }
}

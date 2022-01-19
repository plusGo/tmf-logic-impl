import { Injectable } from '../../../../core/util/bean-factory';
import { IdUtil } from '../../../../core/util/id.util';

/**
 * 支付宝支付的第三方接口
 * 此处主要是模型设计，只进行模拟
 */
@Injectable()
export class AliPayGateway {
  alipay(request: AliPayRequest): void {
    const response: AliPayResponse = {
      app_id: request.app_id,
      trade_no: IdUtil.UUID(),
      out_trade_no: request.out_trade_no,
      total_amount: request.total_amount,
      payment_time: new Date().getTime(),
    };
    this.notify(response, request.notify_callback);
  }

  private notify(response: AliPayResponse, receiver: (response: AliPayResponse) => void): void {
    setTimeout(() => {
      receiver(response);
    }, 3000);
  }
}

export interface AliPayRequest {
  app_id: string; // 支付宝分配给开发者的应用ID
  notify_callback: (params: AliPayResponse) => void; // 回调函数
  out_trade_no: string; // 商户订单号。由商家自定义，64个字符以内，仅支持字母、数字、下划线且需保证在商户端不重复
  total_amount: string; // 订单总金额，单位为元
  time_expire: number; // 过期时间
  subject?: string; // 订单标题
}

export interface AliPayResponse {
  app_id: string; // 支付宝分配给开发者的应用ID
  trade_no: string; // 支付宝的流水号
  out_trade_no: string; // 商户订单号。由商家自定义，64个字符以内，仅支持字母、数字、下划线且需保证在商户端不重复
  total_amount: string; // 订单总金额，单位为元
  payment_time: number; // 用户支付成功的时间
  time_expire: number; // 过期时间
}

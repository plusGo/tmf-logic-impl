export interface AliPayRequest {
  sellerTradeNumber: string; // 在支付宝中注册的商户交易号
  totalAmount: string; // 支付金额
  notifyCallback: (params: any) => void; // 回调函数
  subject: string; // 订单标题
  appOrderId: string; // 商户的订单号
}

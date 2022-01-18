export interface AliPayResponse {
  sellerTradeNumber: string; // 在支付宝中注册的商户交易号
  totalAmount: string; // 支付金额
  paymentTime: number; // 用户支付成功的时间
  tradeNo: string; // 支付宝的流水号
  appOrderId: string; // 商户的订单号
}

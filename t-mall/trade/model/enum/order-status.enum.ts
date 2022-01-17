/**
 * 订单状态
 */
export enum OrderStatus {
  WAIT_START_PAY = '等待支付',
  WAIT_FINISH_PAT = '待付款完成',
  COMPLETE_PAY = '完成支付',
  CLOSED_PAY = '该笔交易已关闭',
  FAILED_PAY = '支付失败',
}

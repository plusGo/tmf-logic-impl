/**
 * 商品订单状态
 */
export enum OrderStatus {
  WAIT_START_PAY = '待付款',
  WAIT_START_SEND = '待发货',
  SENDED = '已发货',
  COMPLETED = '已完成',
  CLOSED = '已关闭',
  INVALID = '无效订单',
}

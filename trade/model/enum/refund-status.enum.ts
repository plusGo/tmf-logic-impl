/**
 * 退款的状态
 */
export enum RefundStatus {
  WAIT = '未退款',
  PENDING = '退款处理中',
  SUCCESS = '退款成功',
  FAILED = '退款不成功',
}

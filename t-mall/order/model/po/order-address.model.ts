/**
 * 订单
 */
import { BaseModel } from '../../../../core/model/po/base.model';

export interface OrderAddress extends BaseModel {
  orderId: string; // 订单号
  address: string; // 订单寄送的地址
  consignee: string; // 收货人姓名
  email: string; // 收货人邮箱
  phone: string; // 收货人手机号
}

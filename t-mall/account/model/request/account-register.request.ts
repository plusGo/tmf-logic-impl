/**
 *   注册用户时的模型
 */
export interface AccountRegisterRequest {
  email: string;
  phone: string;
  userName: string;
  password: string;
  address: string; // 收货地址
}

/**
 * 账户模型
 */
import { BaseModel } from '../../../core/model/po/base.model';

export interface AccountUser extends BaseModel {
  id: string;
  email: string;
  phone: string;
  userName: string;
  password: string;
}

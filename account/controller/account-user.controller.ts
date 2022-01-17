import { inject, Injectable } from '../../core/util/bean-factory';
import { AccountUser } from '../model/po/account-user.model';
import { AccountRegisterRequest } from '../model/request/account-register.request';
import { AccountUserService } from '../service/account-user.service';
import { UserToken } from '../../core/model/dto/user-token.model';

@Injectable()
export class AccountUserController {
  private accountUserService: AccountUserService = inject(AccountUserService);

  /**
   *  注册
   */
  public register(account: AccountRegisterRequest): AccountUser {
    return this.accountUserService.register(account);
  }

  /**
   *  登录
   */
  public login(mobile: string, password: string): UserToken {
    return this.accountUserService.login(mobile, password);
  }

  /**
   *  登出
   */
  public logout(): void {
    this.accountUserService.logout();
  }
}

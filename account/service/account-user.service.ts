import { inject, Injectable } from '../../core/util/bean-factory';
import { AccountRegisterRequest } from '../model/request/account-register.request';
import { AccountUser } from '../model/po/account-user.model';
import { AccountUserRepository } from '../dao/account-user.repository';
import { IdUtil } from '../../core/util/id.util';
import { Logger } from '../../core/util/logger';
import { UserToken } from '../../core/model/dto/user-token.model';
import { TokenUtil } from '../../core/util/token.util';

@Injectable()
export class AccountUserService {
  private accountUserRepository: AccountUserRepository = inject(AccountUserRepository);

  register(account: AccountRegisterRequest): AccountUser {
    const newAccount = {
      ...account,
      id: IdUtil.UUID(),
    };
    this.accountUserRepository.save(newAccount);
    Logger.log('AccountUserService', '用户注册成功', '用户名称', newAccount.userName);
    return newAccount;
  }

  login(phone: string, password: string): UserToken {
    const curAccount = this.accountUserRepository.findAll().find((account) => account.phone === phone && account.password === password);
    if (!curAccount) {
      throw new Error('用户不存在，无法登录');
    } else {
      const userToken = {
        ...curAccount,
      };
      TokenUtil.setCurrentUser(userToken);
      Logger.log('AccountUserService', '用户登录成功', userToken.userName);
      return userToken;
    }
  }

  logout(): void {
    const curUser = TokenUtil.getCurrentUser();
    if (curUser) {
      Logger.log('AccountUserService', '用户登出成功', curUser.userName as string);
    }
    TokenUtil.removeCurrentUser();
  }
}

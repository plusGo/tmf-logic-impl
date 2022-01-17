import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { AccountUser } from '../model/po/account-user.model';

const cache: AccountUser[] = [];

@Injectable()
export class AccountUserRepository extends BaseRepository<AccountUser> {
  constructor() {
    super(StorageFactory.get('local', 'AccountUser'));
    this.initData(cache);
  }
}

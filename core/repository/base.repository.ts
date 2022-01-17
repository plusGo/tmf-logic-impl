import { StorageConnection } from '../util/storage.util';
import { BaseModel } from '../model/po/base.model';
import { TokenUtil } from '../util/token.util';

export abstract class BaseRepository<T extends BaseModel> {
  constructor(protected storageConnection: StorageConnection<T>) {}

  initData(values: T[]): void {
    this.storageConnection.initData(values);
  }

  save(value: T): void {
    const curUser = TokenUtil.getCurrentUser();
    if (curUser) {
      value.createBy = curUser.id;
    }
    this.storageConnection.addOne(value);
  }

  findById(id: string): T | null {
    return this.storageConnection.findById(id);
  }

  findAll(): T[] {
    return this.storageConnection.findAll();
  }
}

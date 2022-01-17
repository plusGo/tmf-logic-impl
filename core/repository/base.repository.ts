import { StorageConnection } from '../util/storage.util';
import { BaseModel } from '../model/po/base.model';
import { TokenUtil } from '../util/token.util';

export abstract class BaseRepository<T extends BaseModel> {
  constructor(protected storageConnection: StorageConnection<T>) {
  }

  initData(values: T[]): void {
    this.storageConnection.initData(values);
  }

  save(value: T): void {
    const curUser = TokenUtil.getCurrentUser();
    if (curUser) {
      value.createBy = curUser.id;
      value.createAt = new Date().getTime();
    }
    this.storageConnection.save(value);
  }

  updateOne(id: string, value: Partial<T>): void {
    const curUser = TokenUtil.getCurrentUser();
    if (curUser) {
      value.updateBy = curUser.id;
      value.updateAt = new Date().getTime();
    }
    this.storageConnection.updateOne(id, value);
  }


  deleteById(id: string): void {
    this.storageConnection.deleteById(id);
  }


  query(words: { field: string; value: string | number }[]): T[] {
    return this.storageConnection.query(words);
  }

  queryOne(words: { field: string; value: string | number }[]): T | null {
    return this.query(words)[0];
  }

  findById(id: string): T | null {
    return this.storageConnection.findById(id);
  }

  findAll(): T[] {
    return this.storageConnection.findAll();
  }
}

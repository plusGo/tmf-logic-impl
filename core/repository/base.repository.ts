import { StorageConnection } from '../util/storage.util';

export abstract class BaseRepository<T extends { id: string }> {

  constructor(protected storageConnection: StorageConnection<T>) {
  }

  initData(values: T[]): void {
    this.storageConnection.initData(values);
  }

  addOne(value: T): void {
    this.storageConnection.addOne(value);
  }

  findById(id: string): T | null {
    return this.storageConnection.findById(id);
  }

  findAll(): T[] {
    return this.storageConnection.findAll();
  }
}

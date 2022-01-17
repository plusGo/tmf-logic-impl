import { BaseModel } from '../model/po/base.model';

export class StorageConnection<T extends BaseModel> {
  private cache: T[] = [];

  constructor(private storage: Storage, private domain: string) {
    this.cache = JSON.parse(this.storage.getItem(this.getKey()) || '[]') || [];
  }

  initData(values: T[]): void {
    this.cache = values;
    this.storage.setItem(this.getKey(), JSON.stringify(this.cache));
  }

  query(words: { field: string; value: string | number }[]): T[] {
    return this.findAll().filter((item) => {
      return words.every((word) => (item as any)[word.field] === word.value);
    });
  }

  addOne(value: T): void {
    this.cache.push(value);
    this.storage.setItem(this.getKey(), JSON.stringify(this.cache));
  }

  findById(id: string): T | null {
    return this.findAll().find((item) => item.id === id) || null;
  }

  findAll(): T[] {
    this.cache = JSON.parse(this.storage.getItem(this.getKey()) || '') || [];
    return this.cache;
  }

  private getKey() {
    return `__${this.domain}__`;
  }
}

export class StorageFactory {
  static get<T extends { id: string }>(type: 'session' | 'local', domain: string): StorageConnection<T> {
    const storage = type === 'session' ? window.sessionStorage : window.localStorage;
    return new StorageConnection<T>(storage, domain);
  }
}

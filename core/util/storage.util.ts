export class StorageConnection<T extends { id: string }> {
  private cache: T[] = [];

  constructor(private storage: Storage, private domain: string) {
    this.cache = JSON.parse(this.storage.getItem(this.getKey()) || '[]') || [];
  }

  initData(values: T[]): void {
    this.cache = values;
    this.storage.setItem(this.getKey(), JSON.stringify(this.cache));
  }

  addOne(value: T): void {
    this.cache.push(value);
    this.storage.setItem(this.getKey(), JSON.stringify(this.cache));
  }

  findById(id: string): T | null {
    return this.findAll().find(item => item.id === id) || null;
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

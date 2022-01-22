export class BeanFactory {
  protected static CACHE = {};

  static register(beanKey: any, bean: Object): void {
    BeanFactory.CACHE[beanKey] = bean;
  }

  static safeGet(beanKey: any): Object | null {
    return BeanFactory.CACHE[beanKey] || null;
  }

}

export const Injectable = (): ClassDecorator => (...args) => {
  const key = args[0];
  const storeInstance = BeanFactory.safeGet(key);
  if (!storeInstance) {
    const instance = new (args[0] as any)();
    BeanFactory.register(key, instance);
  }
};

export const inject = <T>(keys: any): T => {
  if (keys && Array.isArray(keys)) {
    const result = [] as any;
    keys.forEach($item => {
      result.push(BeanFactory.safeGet($item));
    });
    return result;
  }
  const ret =  BeanFactory.safeGet(keys) as T;
  return ret;
};


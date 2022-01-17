import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ShoppingCartItem } from '../model/po/shopping-cart-item.model';

const cache: ShoppingCartItem[] = [];

@Injectable()
export class ShoppingCartItemRepository extends BaseRepository<ShoppingCartItem> {
  constructor() {
    super(StorageFactory.get('local', 'ShoppingCartItem'));
    this.initData(cache);
  }
}

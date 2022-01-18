import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { OrderSkuItem } from '../model/po/order-sku-item.model';

const cache: OrderSkuItem[] = [];

@Injectable()
export class OrderSkuItemRepository extends BaseRepository<OrderSkuItem> {
  constructor() {
    super(StorageFactory.get('local', 'OrderSkuItem'));
    this.initData(cache);
  }
}

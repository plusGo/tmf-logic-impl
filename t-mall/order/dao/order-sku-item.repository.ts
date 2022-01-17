import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { Order } from '../model/po/order.model';

const cache: Order[] = [];

@Injectable()
export class OrderSkuItemRepository extends BaseRepository<Order> {
  constructor() {
    super(StorageFactory.get('local', 'Order'));
    this.initData(cache);
  }
}

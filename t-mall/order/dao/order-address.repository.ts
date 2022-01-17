import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { OrderAddress } from '../model/po/order-address.model';

const cache: OrderAddress[] = [];

@Injectable()
export class OrderAddressRepository extends BaseRepository<OrderAddress> {
  constructor() {
    super(StorageFactory.get('local', 'OrderAddress'));
    this.initData(cache);
  }
}

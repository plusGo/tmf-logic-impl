import { Injectable } from '../../../core/util/bean-factory';
import { PayTransaction } from '../model/po/pay-transaction.model';
import { BaseRepository } from '../../../core/repository/base.repository';
import { StorageFactory } from '../../../core/util/storage.util';

const cache: PayTransaction[] = [];

@Injectable()
export class PayTransactionRepository extends BaseRepository<PayTransaction> {
  constructor() {
    super(StorageFactory.get('local', 'PayTransaction'));
    this.initData(cache);
  }
}

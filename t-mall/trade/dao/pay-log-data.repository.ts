import { Injectable } from '../../../core/util/bean-factory';
import { BaseRepository } from '../../../core/repository/base.repository';
import { StorageFactory } from '../../../core/util/storage.util';
import { PayLogData } from '../model/po/pay-log-data.model';

const cache: PayLogData[] = [];

@Injectable()
export class PayLogDataRepository extends BaseRepository<PayLogData> {
  constructor() {
    super(StorageFactory.get('local', 'PayLogData'));
    this.initData(cache);
  }
}

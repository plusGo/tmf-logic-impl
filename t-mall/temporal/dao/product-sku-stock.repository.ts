import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductSkuStock } from '../model/po/product-sku-stock.model';

const cache: ProductSkuStock[] = [];

@Injectable()
export class ProductSkuStockRepository extends BaseRepository<ProductSkuStock> {
  constructor() {
    super(StorageFactory.get('local', 'ProductSkuStock'));
    this.initData(cache);
  }
}

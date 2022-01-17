import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductSku } from '../model/po/product-sku.model';

const cache: ProductSku[] = [];

@Injectable()
export class ProductSkuRepository extends BaseRepository<ProductSku> {
  constructor() {
    super(StorageFactory.get('local', 'ProductSku'));
    this.initData(cache);
  }
}

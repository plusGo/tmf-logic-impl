import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductSpu } from '../model/po/product-spu.model';

const cache: ProductSpu[] = [];

@Injectable()
export class ProductSpuRepository extends BaseRepository<ProductSpu> {
  constructor() {
    super(StorageFactory.get('local', 'ProductSpu'));
    this.initData(cache);
  }
}

import { Injectable } from '../../core/util/bean-factory';
import { StorageFactory } from '../../core/util/storage.util';
import { BaseRepository } from '../../core/repository/base.repository';
import { ProductSpuSkuAttrMap } from '../model/po/product-spu-sku-attr-map.model';

const cache: ProductSpuSkuAttrMap[] = [];

@Injectable()
export class ProductSpuSkuAttrMapRepository extends BaseRepository<ProductSpuSkuAttrMap> {
  constructor() {
    super(StorageFactory.get('local', 'ProductSpuSkuAttrMap'));
    this.initData(cache);
  }
}

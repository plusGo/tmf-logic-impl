import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductAttr } from '../model/po/product-attr.model';

const cache: ProductAttr[] = [];

@Injectable()
export class ProductAttrRepository extends BaseRepository<ProductAttr> {
  constructor() {
    super(StorageFactory.get('local', 'ProductAttr'));
    this.initData(cache);
  }
}

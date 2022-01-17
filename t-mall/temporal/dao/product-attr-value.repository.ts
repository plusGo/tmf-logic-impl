import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductAttr } from '../model/po/product-attr.model';
import { ProductAttrValue } from '../model/po/product-attr-value.model';

const cache: ProductAttrValue[] = [];

@Injectable()
export class ProductAttrValueRepository extends BaseRepository<ProductAttrValue> {
  constructor() {
    super(StorageFactory.get('local', 'ProductAttrValue'));
    this.initData(cache);
  }
}

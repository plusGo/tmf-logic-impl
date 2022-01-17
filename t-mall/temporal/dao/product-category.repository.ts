import { Injectable } from '../../../core/util/bean-factory';
import { StorageFactory } from '../../../core/util/storage.util';
import { BaseRepository } from '../../../core/repository/base.repository';
import { ProductCategory } from '../model/po/product-category.model';

const cache: ProductCategory[] = [];

@Injectable()
export class ProductCategoryRepository extends BaseRepository<ProductCategory> {
  constructor() {
    super(StorageFactory.get('local', 'ProductCategory'));
    this.initData(cache);
  }
}

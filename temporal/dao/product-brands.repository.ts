import { Injectable } from '../../core/util/bean-factory';
import { StorageFactory } from '../../core/util/storage.util';
import { BaseRepository } from '../../core/repository/base.repository';
import { ProductBrands } from '../model/po/product-brands.model';

const cache: ProductBrands[] = [];

@Injectable()
export class ProductBrandsRepository extends BaseRepository<ProductBrands> {
  constructor() {
    super(StorageFactory.get('local', 'ProductBrands'));
    this.initData(cache);
  }
}

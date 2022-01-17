import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductBrandsRepository } from '../dao/product-brands.repository';
import { ProductBrands } from '../model/po/product-brands.model';
import { IdUtil } from '../../core/util/id.util';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';
import { Logger } from '../../core/util/logger';

@Injectable()
export class ProductBrandsService {
  private productBrandsRepository: ProductBrandsRepository = inject(ProductBrandsRepository);

  save(brand: BrandsSaveRequest): ProductBrands {
    const newBrand: ProductBrands = {
      ...brand,
      id: IdUtil.UUID(),
    };
    this.productBrandsRepository.save(newBrand);
    Logger.log('ProductBrandsService', '创建品牌成功', '品牌名称', newBrand.name);
    return newBrand;
  }
}

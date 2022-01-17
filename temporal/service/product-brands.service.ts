import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductBrandsRepository } from '../dao/product-brands.repository';
import { ProductBrands } from '../model/po/product-brands.model';
import { IdUtil } from '../../core/util/id.util';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';

@Injectable()
export class ProductBrandsService {
  private productBrandsRepository: ProductBrandsRepository = inject(
    ProductBrandsRepository,
  );

  save(brand: BrandsSaveRequest): ProductBrands {
    const newBrand: ProductBrands = {
      ...brand,
      id: IdUtil.UUID(),
    };
    this.productBrandsRepository.save(newBrand);
    return newBrand;
  }
}

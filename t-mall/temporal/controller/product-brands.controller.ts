import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductBrands } from '../model/po/product-brands.model';
import { ProductBrandsService } from '../service/product-brands.service';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';

@Injectable()
export class ProductBrandsController {
  private productBrandsService: ProductBrandsService = inject(ProductBrandsService);

  /**
   *  εε»Ίεη
   */
  public save(brand: BrandsSaveRequest): ProductBrands {
    return this.productBrandsService.save(brand);
  }
}

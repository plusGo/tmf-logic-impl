import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductBrandsRepository } from '../dao/product-brands.repository';
import { ProductBrands } from '../model/po/product-brands.model';
import { IdUtil } from '../../core/util/id.util';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';
import { ProductCategoryRepository } from '../dao/product-category.repository';
import { CategorySaveRequest } from '../model/reuqest/category-save.request';
import { ProductCategory } from '../model/po/product-category.model';
import { Logger } from '../../core/util/logger';

@Injectable()
export class ProductCategoryService {
  private productCategoryRepository: ProductCategoryRepository = inject(ProductCategoryRepository);

  save(category: CategorySaveRequest): ProductCategory {
    const newCategory: ProductCategory = {
      ...category,
      id: IdUtil.UUID(),
    };
    this.productCategoryRepository.save(newCategory);
    Logger.log('ProductCategoryService', '创建商品类别成功', '类别名称', newCategory.name);
    return newCategory;
  }
}

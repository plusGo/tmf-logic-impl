import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductCategoryService } from '../service/product-category.service';
import { CategorySaveRequest } from '../model/reuqest/category-save.request';
import { ProductCategory } from '../model/po/product-category.model';

@Injectable()
export class ProductCategoryController {
  private productCategoryService: ProductCategoryService = inject(
    ProductCategoryService,
  );

  /**
   *  创建类别
   */
  public save(category: CategorySaveRequest): ProductCategory {
    return this.productCategoryService.save(category);
  }
}

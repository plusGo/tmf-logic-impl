import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductSkuService } from '../service/product-sku.service';
import { SkuSaveRequest } from '../model/reuqest/sku-save.request';
import { SkuDto } from '../model/dto/sku.dto';

@Injectable()
export class ProductSkuController {
  private productSkuService: ProductSkuService = inject(ProductSkuService);

  /**
   *  创建产品sku
   */
  public save(sku: SkuSaveRequest): SkuDto {
    return this.productSkuService.save(sku);
  }
}

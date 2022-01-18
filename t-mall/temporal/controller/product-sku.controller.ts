import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductSkuService } from '../service/product-sku.service';
import { SkuSaveRequest } from '../model/reuqest/sku-save.request';
import { SkuDto } from '../model/dto/sku.dto';
import { ProductSkuStockService } from '../service/product-sku-stock.service';

@Injectable()
export class ProductSkuController {
  private productSkuService: ProductSkuService = inject(ProductSkuService);
  private productSkuStockService: ProductSkuStockService = inject(ProductSkuStockService);

  /**
   *  创建产品sku
   */
  public save(sku: SkuSaveRequest): SkuDto {
    return this.productSkuService.save(sku);
  }

  /**
   * 获取SKU详情
   */
  getDetail(skuId: string): SkuDto {
    return this.productSkuService.getDetail(skuId);
  }

  /**
   * 减少SKU的库存数量，若库存不够，返回false
   */
  reduceQuantityAndValidate(skuId: string, count: number): boolean {
    return this.productSkuStockService.reduceQuantityAndValidate(skuId, count);
  }
}

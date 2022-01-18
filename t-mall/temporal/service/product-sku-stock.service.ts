import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductSkuStockRepository } from '../dao/product-sku-stock.repository';
import { ProductSkuStock } from '../model/po/product-sku-stock.model';
import { IdUtil } from '../../../core/util/id.util';

@Injectable()
export class ProductSkuStockService {
  private productSkuStockRepository: ProductSkuStockRepository = inject(ProductSkuStockRepository);

  /**
   * 获取库存数量
   */
  getQuantity(skuId: string): number {
    const ret = this.productSkuStockRepository.query([{ field: 'skuId', value: skuId }])[0] as ProductSkuStock;
    return ret.quantity;
  }

  reduceQuantityAndValidate(skuId: string, count: number): boolean {
    const ret = this.productSkuStockRepository.query([{ field: 'skuId', value: skuId }])[0] as ProductSkuStock;

    const quantity = ret.quantity;
    if (count > quantity) {
      return false;
    } else {
      this.productSkuStockRepository.updateOne(ret.id, { quantity: quantity - count });
      return true;
    }
  }

  save(skuId: string, quantity: number): ProductSkuStock {
    const newStock: ProductSkuStock = {
      skuId: skuId,
      quantity: quantity,
      id: IdUtil.UUID(),
    };
    this.productSkuStockRepository.save(newStock);
    return newStock;
  }
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductSpuSkuAttrMapRepository } from '../dao/product-spu-sku-attr-map.repository';
import { ArrayUtil } from '../../../core/util/array.util';

@Injectable()
export class ProductSpuSkuAttrMapService {
  private productSpuSkuAttrMapRepository: ProductSpuSkuAttrMapRepository = inject(ProductSpuSkuAttrMapRepository);

  /**
   *  spu下有哪些sku
   */
  public getSkuIds(spuId: string): string[] {
    const skuIds = this.productSpuSkuAttrMapRepository.query([{ field: 'spuId', value: spuId }]).map((item) => item.skuId);
    return ArrayUtil.unique(skuIds);
  }

  /**
   * spu下 有哪些销售属性
   */
  public getAttrIds(spuId: string): string[] {
    const attrIds = this.productSpuSkuAttrMapRepository.query([{ field: 'spuId', value: spuId }]).map((item) => item.attrId);
    return ArrayUtil.unique(attrIds);
  }

  /**
   * spu下 一个销售属性有哪些值
   */
  public getAttrValues(spuId: string, attrId: string): string[] {
    const valueIds = this.productSpuSkuAttrMapRepository
      .query([
        { field: 'spuId', value: spuId },
        { field: 'attrId', value: attrId },
      ])
      .map((item) => item.attrValueId);
    return ArrayUtil.unique(valueIds);
  }

  /**
   * spu下 一个销售属性值对应的skuIds
   */
  public getSkuIdsByAttrValueId(spuId: string, attrValueId: string): string[] {
    const skuIds = this.productSpuSkuAttrMapRepository
      .query([
        { field: 'spuId', value: spuId },
        { field: 'attrValueId', value: attrValueId },
      ])
      .map((item) => item.skuId);

    return ArrayUtil.unique(skuIds);
  }
}

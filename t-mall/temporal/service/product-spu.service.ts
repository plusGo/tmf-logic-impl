import { inject, Injectable } from '../../../core/util/bean-factory';
import { IdUtil } from '../../../core/util/id.util';
import { ProductSpuRepository } from '../dao/product-spu.repository';
import { SpuSaveRequest } from '../model/reuqest/spu-save.request';
import { ProductSpu } from '../model/po/product-spu.model';
import { ProductSpuAttrDto } from '../model/dto/product-spu-attr.dto';
import { PriceUtil } from '../../../core/util/price.util';
import { ProductAttrService } from './product-attr.service';
import { ProductSpuSkuAttrMapService } from './product-spu-sku-attr-map.service';
import { ProductSkuStockService } from './product-sku-stock.service';
import { ProductSkuService } from './product-sku.service';
import { Logger } from '../../../core/util/logger';

@Injectable()
export class ProductSpuService {
  private productSpuRepository: ProductSpuRepository = inject(ProductSpuRepository);
  private productAttrService: ProductAttrService = inject(ProductAttrService);
  private productSpuSkuAttrMapService: ProductSpuSkuAttrMapService = inject(ProductSpuSkuAttrMapService);
  private productSkuStockService: ProductSkuStockService = inject(ProductSkuStockService);
  private productSkuService: ProductSkuService = inject(ProductSkuService);

  save(spu: SpuSaveRequest): ProductSpu {
    const priceFree = Number(spu.price.replace('.', ''));
    const priceScale = spu.price.indexOf('.') === -1 ? 0 : spu.price.length - 1 - spu.price.indexOf('.');
    const marketPriceFree = Number(spu.marketPrice.replace('.', ''));
    const marketPriceScale = spu.marketPrice.indexOf('.') === -1 ? 0 : spu.price.length - 1 - spu.price.indexOf('.');
    delete spu.price;
    delete spu.marketPrice;

    const newSpu: ProductSpu = {
      ...spu,
      priceFree,
      priceScale,
      marketPriceFree,
      marketPriceScale,
      id: IdUtil.UUID(),
    };
    this.productSpuRepository.save(newSpu);

    Logger.log('ProductSpuService', 'SPU创建成功', 'SPU名称', newSpu.name);

    return newSpu;
  }

  getDetail(spuId: string): ProductSpuAttrDto {
    const spu = this.productSpuRepository.findById(spuId) as ProductSpu;

    const skuIds = this.productSpuSkuAttrMapService.getSkuIds(spuId);

    return {
      id: spu.id,
      name: spu.name,
      desc: spu.desc,
      sellingPoint: spu.sellingPoint,
      unit: spu.unit,
      price: PriceUtil.transform(spu.priceFree, spu.priceScale),
      marketPrice: PriceUtil.transform(spu.marketPriceFree, spu.marketPriceScale),
      attrs: this.productAttrService.getAttrsWithSpus(spu.id),
      skus: skuIds.map((skuId) => {
        return `${this.productSkuStockService.getQuantity(skuId)},${skuId}`;
      }),
      skusMap: this.productSkuService.getSkuMap(spuId),
    };
  }
}

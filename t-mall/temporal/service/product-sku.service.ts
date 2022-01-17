import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductSkuRepository } from '../dao/product-sku.repository';
import { SkuSaveRequest } from '../model/reuqest/sku-save.request';
import { SkuDto } from '../model/dto/sku.dto';
import { IdUtil } from '../../../core/util/id.util';
import { ProductSku } from '../model/po/product-sku.model';
import { ProductAttrRepository } from '../dao/product-attr.repository';
import { ProductSpuSkuAttrMap } from '../model/po/product-spu-sku-attr-map.model';
import { ProductAttr } from '../model/po/product-attr.model';
import { ProductSpuSkuAttrMapRepository } from '../dao/product-spu-sku-attr-map.repository';
import { ProductSpuSkuAttrMapService } from './product-spu-sku-attr-map.service';
import { ProductSkuStockService } from './product-sku-stock.service';
import { Logger } from '../../../core/util/logger';
import { ProductSpuRepository } from '../dao/product-spu.repository';
import { ProductSpu } from '../model/po/product-spu.model';

@Injectable()
export class ProductSkuService {
  private productSkuRepository: ProductSkuRepository = inject(ProductSkuRepository);
  private productAttrRepository: ProductAttrRepository = inject(ProductAttrRepository);
  private productSpuSkuAttrMapRepository: ProductSpuSkuAttrMapRepository = inject(ProductSpuSkuAttrMapRepository);
  private productSkuStockService: ProductSkuStockService = inject(ProductSkuStockService);
  private productSpuSkuAttrMapService: ProductSpuSkuAttrMapService = inject(ProductSpuSkuAttrMapService);

  save(sku: SkuSaveRequest): SkuDto {
    const priceFree = Number(sku.price.replace('.', ''));
    const priceScale = sku.price.indexOf('.') === -1 ? 0 : sku.price.length - 1 - sku.price.indexOf('.');
    const marketPriceFree = Number(sku.marketPrice.replace('.', ''));
    const marketPriceScale = sku.marketPrice.indexOf('.') === -1 ? 0 : sku.price.length - 1 - sku.price.indexOf('.');

    const newSku: ProductSku = {
      spuId: sku.spu.id,
      priceFree,
      priceScale,
      marketPriceFree,
      marketPriceScale,
      attrs: sku.attrValues.map((item) => item.id).join('-'),
      id: IdUtil.UUID(),
    };
    this.productSkuRepository.save(newSku);

    this.productSkuStockService.save(newSku.id, sku.quantity);

    sku.attrValues.forEach((item) => {
      const attr = this.productAttrRepository.findById(item.attrId) as ProductAttr;
      const newMap: ProductSpuSkuAttrMap = {
        spuId: sku.spu.id,
        skuId: newSku.id,
        attrId: item.attrId,
        attrName: attr.name,
        attrValueId: item.id,
        attrValueName: item.value,
        id: IdUtil.UUID(),
      };
      this.productSpuSkuAttrMapRepository.save(newMap);
    });

    const skuName = `${sku.spu.name}${sku.attrValues.map((item) => item.value).join('')}`;

    Logger.log('ProductSkuService', '创建SKU成功', 'SKU名称', skuName, '库存', `${sku.quantity}`);

    return {
      id: newSku.id,
      name: skuName,
      desc: sku.spu.desc,
      unit: sku.spu.unit,
      price: sku.price,
      marketPrice: sku.marketPrice,
    };
  }

  public getSkuMap(spuId: string): Record<string, string> {
    const skuIds = this.productSpuSkuAttrMapService.getSkuIds(spuId);
    const ret: Record<string, string> = {};
    skuIds.forEach((skuId) => {
      const sku = this.productSkuRepository.findById(skuId) as ProductSku;
      ret[sku.attrs] = `${this.productSkuStockService.getQuantity(skuId)},${skuId}`;
    });
    return ret;
  }
}

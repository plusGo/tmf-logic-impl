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
import { PriceUtil } from '../../../core/util/price.util';
import { ProductAttrValueRepository } from '../dao/product-attr-value.repository';

@Injectable()
export class ProductSkuService {
  private productSkuRepository: ProductSkuRepository = inject(ProductSkuRepository);
  private productAttrRepository: ProductAttrRepository = inject(ProductAttrRepository);
  private productSpuSkuAttrMapRepository: ProductSpuSkuAttrMapRepository = inject(ProductSpuSkuAttrMapRepository);
  private productSkuStockService: ProductSkuStockService = inject(ProductSkuStockService);
  private productSpuSkuAttrMapService: ProductSpuSkuAttrMapService = inject(ProductSpuSkuAttrMapService);
  private productSpuRepository: ProductSpuRepository = inject(ProductSpuRepository);
  private productAttrValueRepository: ProductAttrValueRepository = inject(ProductAttrValueRepository);

  save(skuRequest: SkuSaveRequest): SkuDto {
    const priceFree = Number(skuRequest.price.replace('.', ''));
    const priceScale = skuRequest.price.indexOf('.') === -1 ? 0 : skuRequest.price.length - 1 - skuRequest.price.indexOf('.');
    const marketPriceFree = Number(skuRequest.marketPrice.replace('.', ''));
    const marketPriceScale = skuRequest.marketPrice.indexOf('.') === -1 ? 0 : skuRequest.price.length - 1 - skuRequest.price.indexOf('.');

    const newSku: ProductSku = {
      spuId: skuRequest.spu.id,
      priceFree,
      priceScale,
      marketPriceFree,
      marketPriceScale,
      attrs: skuRequest.attrValues.map((item) => item.id).join('-'),
      id: IdUtil.UUID(),
    };
    this.productSkuRepository.save(newSku);

    this.productSkuStockService.save(newSku.id, skuRequest.quantity);

    skuRequest.attrValues.forEach((item) => {
      const attr = this.productAttrRepository.findById(item.attrId) as ProductAttr;
      const newMap: ProductSpuSkuAttrMap = {
        spuId: skuRequest.spu.id,
        skuId: newSku.id,
        attrId: item.attrId,
        attrName: attr.name,
        attrValueId: item.id,
        attrValueName: item.value,
        id: IdUtil.UUID(),
      };
      this.productSpuSkuAttrMapRepository.save(newMap);
    });

    const skuName = `${skuRequest.spu.name}${skuRequest.attrValues.map((item) => item.value).join('')}`;

    Logger.log('ProductSkuService', '创建SKU成功', 'SKU名称', skuName, '库存', `${skuRequest.quantity}`);

    return {
      id: newSku.id,
      name: skuName,
      desc: skuRequest.spu.desc,
      unit: skuRequest.spu.unit,
      price: skuRequest.price,
      marketPrice: skuRequest.marketPrice,
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

  getDetail(skuId: string): SkuDto {
    const sku = this.productSkuRepository.findById(skuId) as ProductSku;
    const spu = this.productSpuRepository.findById(sku?.spuId as string) as ProductSpu;
    const names = this.productSpuSkuAttrMapService.getAttrValueIdsBySkuId(skuId).map(valueId =>{
      return this.productAttrValueRepository.findById(valueId)?.value
    }).join('');
    this.productAttrRepository
    const skuName = `${spu.name}${names}`;
    return {
      id: skuId,
      name: skuName,
      desc: spu.desc,
      unit: spu.unit,
      price: PriceUtil.transform(sku.priceFree,sku.priceScale),
      marketPrice: PriceUtil.transform(sku.marketPriceFree,sku.marketPriceScale),
    };
  }
}

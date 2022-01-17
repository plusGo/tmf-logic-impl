import { inject, Injectable } from '../../core/util/bean-factory';
import { IdUtil } from '../../core/util/id.util';
import { ProductAttrRepository } from '../dao/product-attr.repository';
import { ProductAttrValueRepository } from '../dao/product-attr-value.repository';
import { AttrSaveRequest } from '../model/reuqest/attr-save.request';
import { AttrValueDto } from '../model/dto/attr-value.dto';
import { ProductAttrValue } from '../model/po/product-attr-value.model';
import { ProductAttr } from '../model/po/product-attr.model';
import { AttrValueWithSkus } from '../model/dto/product-spu-attr.dto';
import { ProductSpuSkuAttrMapService } from './product-spu-sku-attr-map.service';
import { ProductSkuStockService } from './product-sku-stock.service';

@Injectable()
export class ProductAttrService {
  private productAttrRepository: ProductAttrRepository = inject(ProductAttrRepository);
  private productAttrValueRepository: ProductAttrValueRepository = inject(ProductAttrValueRepository);
  private productSpuSkuAttrMapService: ProductSpuSkuAttrMapService = inject(ProductSpuSkuAttrMapService);
  private productSkuStockService: ProductSkuStockService = inject(ProductSkuStockService);

  save(attr: AttrSaveRequest): AttrValueDto {
    const newAttr: ProductAttr = {
      name: attr.name,
      desc: attr.desc,
      id: IdUtil.UUID(),
    };
    this.productAttrRepository.save(newAttr);

    const newValues = attr.values.map((item) => {
      const newValue: ProductAttrValue = {
        value: item.value,
        desc: item.desc,
        attrId: newAttr.id,
        id: IdUtil.UUID(),
      };
      this.productAttrValueRepository.save(newValue);
      return newValue;
    });

    return {
      attr: newAttr,
      values: newValues,
    };
  }

  getAttrsWithSpus(spuId: string): (ProductAttr & { values: AttrValueWithSkus[] })[] {
    const attrIds = this.productSpuSkuAttrMapService.getAttrIds(spuId);
    return attrIds.map((attrId) => {
      const productAttr = this.productAttrRepository.findById(attrId) as ProductAttr;
      const values = this.productSpuSkuAttrMapService.getAttrValues(spuId, attrId).map((attrValueId) => {
        const attrValue = this.productAttrValueRepository.findById(attrValueId) as ProductAttrValue;
        const skus = this.productSpuSkuAttrMapService.getSkuIdsByAttrValueId(spuId, attrValueId).map((skuId) => {
          return `${this.productSkuStockService.getQuantity(skuId)},${skuId}`;
        });
        return {
          ...attrValue,
          skus,
        };
      });

      return {
        ...productAttr,
        values: values,
      };
    });
  }
}

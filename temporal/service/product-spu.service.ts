import { inject, Injectable } from '../../core/util/bean-factory';
import { IdUtil } from '../../core/util/id.util';
import { ProductSpuRepository } from '../dao/product-spu.repository';
import { SpuSaveRequest } from '../model/reuqest/spu-save.request';
import { ProductSpu } from '../model/po/product-spu.model';

@Injectable()
export class ProductSpuService {
  private productSpuRepository: ProductSpuRepository =
    inject(ProductSpuRepository);

  save(spu: SpuSaveRequest): ProductSpu {
    const priceFree = Number(spu.price.replace('.', ''));
    const priceScale =
      spu.price.indexOf('.') === -1
        ? 0
        : spu.price.length - 1 - spu.price.indexOf('.');
    const marketPriceFree = Number(spu.marketPrice.replace('.', ''));
    const marketPriceScale =
      spu.marketPrice.indexOf('.') === -1
        ? 0
        : spu.price.length - 1 - spu.price.indexOf('.');
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
    return newSpu;
  }
}

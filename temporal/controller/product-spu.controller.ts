import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductBrands } from '../model/po/product-brands.model';
import { ProductBrandsService } from '../service/product-brands.service';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';
import { ProductSpuService } from '../service/product-spu.service';
import { SpuSaveRequest } from '../model/reuqest/spu-save.request';
import { ProductSpu } from '../model/po/product-spu.model';
import { ProductSpuAttrDto } from '../model/dto/product-spu-attr.dto';

@Injectable()
export class ProductSpuController {
  private productSpuService: ProductSpuService = inject(ProductSpuService);

  /**
   *  创建spu
   */
  public save(spu: SpuSaveRequest): ProductSpu {
    return this.productSpuService.save(spu);
  }

  /**
   * 获取spu详情
   */
  public getDetail(spuId: string): ProductSpuAttrDto {
    return this.productSpuService.getDetail(spuId);
  }
}

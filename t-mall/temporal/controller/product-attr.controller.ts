import { inject, Injectable } from '../../../core/util/bean-factory';
import { ProductAttrService } from '../service/product-attr.service';
import { AttrSaveRequest } from '../model/reuqest/attr-save.request';
import { AttrValueDto } from '../model/dto/attr-value.dto';

@Injectable()
export class ProductAttrController {
  private productAttrService: ProductAttrService = inject(ProductAttrService);

  /**
   *  创建属性与属性值
   */
  public save(attr: AttrSaveRequest): AttrValueDto {
    return this.productAttrService.save(attr);
  }
}

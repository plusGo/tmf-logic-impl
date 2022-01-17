import { inject, Injectable } from '../../core/util/bean-factory';
import { ProductBrandsRepository } from '../dao/product-brands.repository';
import { ProductBrands } from '../model/po/product-brands.model';
import { IdUtil } from '../../core/util/id.util';
import { BrandsSaveRequest } from '../model/reuqest/brands-save.request';
import { ProductAttrRepository } from '../dao/product-attr.repository';
import { ProductAttrValueRepository } from '../dao/product-attr-value.repository';
import { AttrSaveRequest } from '../model/reuqest/attr-save.request';
import { AttrValueDto } from '../model/dto/attr-value.dto';
import { ProductAttrValue } from '../model/po/product-attr-value.model';

@Injectable()
export class ProductAttrService {
  private productAttrRepository: ProductAttrRepository = inject(
    ProductAttrRepository,
  );
  private productAttrValueRepository: ProductAttrValueRepository = inject(
    ProductAttrValueRepository,
  );

  save(attr: AttrSaveRequest): AttrValueDto {
    const newAttr: ProductBrands = {
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
}

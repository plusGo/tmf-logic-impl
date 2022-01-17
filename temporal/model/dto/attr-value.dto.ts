import { ProductAttr } from '../po/product-attr.model';
import { ProductAttrValue } from '../po/product-attr-value.model';

export interface AttrValueDto {
  attr: ProductAttr;
  values: ProductAttrValue[];
}

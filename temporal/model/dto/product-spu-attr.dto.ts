import { ProductAttr } from '../po/product-attr.model';
import { ProductAttrValue } from '../po/product-attr-value.model';

export interface ProductSpuAttrDto {
  id: string;
  name: string;
  desc: string;
  sellingPoint: string;
  unit: string;
  price: string;
  marketPrice: string;
  attrs: (ProductAttr & { values: AttrValueWithSkus[] })[];
  skus: string[];
  skusMap: Record<string, string>;
}

export type AttrValueWithSkus = ProductAttrValue & { skus: string[] };

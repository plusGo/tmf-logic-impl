import { BaseModel } from '../../../../core/model/po/base.model';

export interface ShoppingCartItem extends BaseModel {
  skuId: string;
  quantity: number;
}

import { SkuDto } from '../../../temporal/model/dto/sku.dto';

export interface ShoppingCartDetailDto {
  items: ShoppingCartDetailItemDto[];
}

export interface ShoppingCartDetailItemDto {
  sku: SkuDto;
  quantity: number;
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { ShoppingCartItemRepository } from '../dao/shopping-cart-item.repository';
import { IdUtil } from '../../../core/util/id.util';
import { ShoppingCartItem } from '../model/po/shopping-cart-item.model';
import { ShoppingCartDetailDto } from '../model/dto/shopping-cart-detail.dto';
import { TokenUtil } from '../../../core/util/token.util';
import { Logger } from '../../../core/util/logger';
import { ProductSkuController } from '../../temporal/controller/product-sku.controller';

@Injectable()
export class ShoppingCartService {
  private shoppingCartItemRepository: ShoppingCartItemRepository = inject(ShoppingCartItemRepository);
  private productSkuController: ProductSkuController = inject(ProductSkuController);

  saveSKU(skuId: string, quantity: number): void {
    const shoppingCartItem = this.shoppingCartItemRepository.queryOne([{ field: 'skuId', value: skuId }]);
    if (shoppingCartItem) {
      this.shoppingCartItemRepository.updateOne(shoppingCartItem.id, { quantity: shoppingCartItem.quantity + quantity });
    } else {
      const newItem: ShoppingCartItem = {
        skuId: skuId,
        quantity: quantity,
        id: IdUtil.UUID(),
      };
      this.shoppingCartItemRepository.save(newItem);
    }
    Logger.log('ShoppingCartService', '购物车添加商品成功', 'skuId', skuId, '新增数量', `${quantity}`);
  }

  getDetail(): ShoppingCartDetailDto {
    const curUser = TokenUtil.getCurrentUser();
  }
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { ShoppingCartItemRepository } from '../dao/shopping-cart-item.repository';
import { IdUtil } from '../../../core/util/id.util';
import { ShoppingCartItem } from '../model/po/shopping-cart-item.model';
import { ShoppingCartDetailDto, ShoppingCartDetailItemDto } from '../model/dto/shopping-cart-detail.dto';
import { TokenUtil } from '../../../core/util/token.util';
import { Logger } from '../../../core/util/logger';
import { ProductSkuController } from '../../temporal/controller/product-sku.controller';
import { UserToken } from '../../../core/model/dto/user-token.model';
import { OrderController } from '../../order/controller/order.controller';
import { OrderSaveRequest } from '../../order/model/request/order-save.request';
import { OrderDto } from '../../order/model/dto/order.dto';

@Injectable()
export class ShoppingCartService {
  private shoppingCartItemRepository: ShoppingCartItemRepository = inject(ShoppingCartItemRepository);
  private productSkuController: ProductSkuController = inject(ProductSkuController);
  private orderController: OrderController = inject(OrderController);

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

  getDetail(): ShoppingCartDetailDto | null {
    const curUser = TokenUtil.getCurrentUser() as UserToken;
    if (!curUser) {
      return null;
    }
    const items = this.shoppingCartItemRepository.query([{ field: 'createBy', value: curUser.id as string }]);

    return {
      items: items.map((item) => {
        return {
          sku: this.productSkuController.getDetail(item.skuId),
          quantity: item.quantity,
        };
      }),
    };
  }

  buyAll(): OrderDto {
    const cartItems: ShoppingCartDetailItemDto[] = this.getDetail()?.items || [];
    const curUser = TokenUtil.getCurrentUser() as UserToken;
    Logger.log('ShoppingCartService', '购买购物车中所有商品', '用户', curUser.userName || '');

    const skusAmount = cartItems.reduce((prev, item) => {
      const sku = item.sku;
      return Number(sku.price) * item.quantity + prev;
    }, 0);

    const saveOrderReq: OrderSaveRequest = {
      skusAmount: skusAmount,
      finalAmount: skusAmount,
      promotionAmount: 0,
      freight: 0,
      skuItems: cartItems.map((item) => {
        return {
          skuId: item.sku.id,
          quantity: item.quantity,
        };
      }),
      address: {
        consignee: curUser.userName as string,
        address: curUser.address as string,
        phone: curUser.phone as string,
      },
    };
    return this.orderController.save(saveOrderReq);
  }

}

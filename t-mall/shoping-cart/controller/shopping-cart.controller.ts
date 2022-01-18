import { inject, Injectable } from '../../../core/util/bean-factory';
import { ShoppingCartService } from '../service/shopping-cart.service';
import { ShoppingCartDetailDto } from '../model/dto/shopping-cart-detail.dto';
import { OrderDto } from '../../order/model/dto/order.dto';

@Injectable()
export class ShoppingCartController {
  private shoppingCartService: ShoppingCartService = inject(ShoppingCartService);

  /**
   *  添加商品
   */
  public saveSKU(skuId: string, quantity: number): void {
    this.shoppingCartService.saveSKU(skuId, quantity);
  }

  /**
   * 查看购物车详情
   */
  public getDetail(): ShoppingCartDetailDto | null {
    return this.shoppingCartService.getDetail();
  }

  /**
   *  购买购物车全部的物品，返回订单
   */
  public buyAll(): OrderDto {
    return this.shoppingCartService.buyAll();
  }
}

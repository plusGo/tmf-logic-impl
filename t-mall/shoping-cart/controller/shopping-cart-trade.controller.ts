import { inject, Injectable } from '../../../core/util/bean-factory';
import { OrderDto } from '../../order/model/dto/order.dto';
import { PayTransaction } from '../../trade/model/po/pay-transaction.model';
import { ShoppingCartTradeService } from '../service/shopping-cart-trade.service';

@Injectable()
export class ShoppingCartTradeController {
  private shoppingCartTradeService: ShoppingCartTradeService = inject(ShoppingCartTradeService);


  public trade(order: OrderDto): Promise<PayTransaction> {
    return this.shoppingCartTradeService.trade(order);
  }

}

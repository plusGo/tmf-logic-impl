import { inject, Injectable } from '../../../core/util/bean-factory';
import { OrderSaveRequest } from '../model/request/order-save.request';
import { OrderService } from '../service/order.service';
import { OrderDto } from '../model/dto/order.dto';

@Injectable()
export class OrderController {
  private orderService: OrderService = inject(OrderService);

  /**
   *  从购物车中创建订单
   */
  public save(request: OrderSaveRequest): OrderDto {
    return this.orderService.save(request);
  }
}

import { inject, Injectable } from '../../../core/util/bean-factory';
import { AttrSaveRequest } from '../model/reuqest/attr-save.request';
import { AttrValueDto } from '../model/dto/attr-value.dto';
import { OrderSaveRequest } from '../model/request/order-save.request';

@Injectable()
export class OrderController {
  private orderController: OrderController = inject(OrderController);

  /**
   *  从购物车中创建订单 todo
   */
  public save(request: OrderSaveRequest): AttrValueDto {
    return this.productAttrService.save(attr);
  }
}

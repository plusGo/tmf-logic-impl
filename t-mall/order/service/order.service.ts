import { inject, Injectable } from '../../../core/util/bean-factory';
import { OrderRepository } from '../dao/order.repository';
import { OrderAddressRepository } from '../dao/order-address.repository';
import { OrderSkuItemRepository } from '../dao/order-sku-item.repository';

@Injectable()
export class OrderService {
  private orderRepository: OrderRepository = inject(OrderRepository);
  private orderAddressRepository: OrderAddressRepository = inject(OrderAddressRepository);
  private orderSkuItemRepository: OrderSkuItemRepository = inject(OrderSkuItemRepository);
}

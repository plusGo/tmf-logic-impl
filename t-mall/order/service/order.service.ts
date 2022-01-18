import { inject, Injectable } from '../../../core/util/bean-factory';
import { OrderRepository } from '../dao/order.repository';
import { OrderAddressRepository } from '../dao/order-address.repository';
import { OrderSkuItemRepository } from '../dao/order-sku-item.repository';
import { OrderSaveRequest } from '../model/request/order-save.request';
import { OrderDto } from '../model/dto/order.dto';
import { IdUtil } from '../../../core/util/id.util';
import { Order } from '../model/po/order.model';
import { OrderAddress } from '../model/po/order-address.model';
import { OrderSkuItem } from '../model/po/order-sku-item.model';
import { OrderStatus } from '../model/enum/order-status.enum';
import { Logger } from '../../../core/util/logger';
import { TokenUtil } from '../../../core/util/token.util';
import { UserToken } from '../../../core/model/dto/user-token.model';
import { ProductSkuController } from '../../temporal/controller/product-sku.controller';

@Injectable()
export class OrderService {
  private orderRepository: OrderRepository = inject(OrderRepository);
  private orderAddressRepository: OrderAddressRepository = inject(OrderAddressRepository);
  private orderSkuItemRepository: OrderSkuItemRepository = inject(OrderSkuItemRepository);
  private productSkuController: ProductSkuController = inject(ProductSkuController);

  save(request: OrderSaveRequest): OrderDto {
    const curUser = TokenUtil.getCurrentUser() as UserToken;

    const newOrder: Order = {
      promotionAmount: request.promotionAmount,
      freight: request.freight,
      skusAmount: request.skusAmount,
      finalAmount: request.finalAmount,
      status: OrderStatus.WAIT_START_PAY,
      orderId: IdUtil.UUID(),
      id: IdUtil.UUID(),
    };
    this.orderRepository.save(newOrder);

    const newOrderAddress: OrderAddress = {
      ...request.address,
      orderId: newOrder.id,
      id: IdUtil.UUID(),
    };
    this.orderAddressRepository.save(newOrderAddress);

    const newOrderSkuItems: OrderSkuItem[] = request.skuItems.map((item) => {
      const newItem = {
        ...item,
        id: IdUtil.UUID(),
        orderId: newOrder.id,
      };
      this.orderSkuItemRepository.save(newItem);
      if (!this.productSkuController.reduceQuantityAndValidate(item.skuId, item.quantity)) {
        throw new Error('库存不够');
      }
      return newItem;
    });
    const orderDto: OrderDto = {
      id: newOrder.id,
      orderId: newOrder.orderId,
      promotionAmount: newOrder.promotionAmount,
      freight: newOrder.freight,
      skusAmount: newOrder.skusAmount,
      finalAmount: newOrder.finalAmount,
      status: OrderStatus.WAIT_START_PAY,
      address: {
        address: newOrderAddress.address,
        consignee: newOrderAddress.consignee,
        phone: newOrderAddress.phone,
      },
      skuItems: newOrderSkuItems.map((item) => {
        return {
          skuId: item.skuId,
          quantity: item.quantity,
        };
      }),
    };
    Logger.log('ShoppingCartService', '创建订单', '用户', curUser.userName || '', '订单详情', JSON.stringify(orderDto, null, 4));

    return orderDto;
  }
}

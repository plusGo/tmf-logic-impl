import styles from './index.less';
import { TradeController } from '../../t-mall/trade/controller/trade.controller';
import { inject } from '../../core/util/bean-factory';
import { AccountUserController } from '../../t-mall/account/controller/account-user.controller';
import { TokenUtil } from '../../core/util/token.util';
import { ProductBrandsController } from '../../t-mall/temporal/controller/product-brands.controller';
import { ProductCategoryController } from '../../t-mall/temporal/controller/product-category.controller';
import { ProductSpuController } from '../../t-mall/temporal/controller/product-spu.controller';
import { ProductAttrController } from '../../t-mall/temporal/controller/product-attr.controller';
import { ProductSkuController } from '../../t-mall/temporal/controller/product-sku.controller';
import { ShoppingCartController } from '../../t-mall/shoping-cart/controller/shopping-cart.controller';
import { Logger } from '../../core/util/logger';

export default function IndexPage() {
  const userController = inject<AccountUserController>(AccountUserController);
  const productBrandsController = inject<ProductBrandsController>(ProductBrandsController);
  const productCategoryController = inject<ProductCategoryController>(ProductCategoryController);
  const productSpuController = inject<ProductSpuController>(ProductSpuController);
  const productAttrController = inject<ProductAttrController>(ProductAttrController);
  const productSkuController = inject<ProductSkuController>(ProductSkuController);
  const shoppingCartController = inject<ShoppingCartController>(ShoppingCartController);
  const cashRegisterController = inject<TradeController>(TradeController);

  // 注册用户
  userController.register({
    email: 'mhlplus@outlook.com',
    userName: 'Henry',
    phone: '18628110404',
    password: '123456',
    address: '四川省 成都市 双流区 南湖逸家',
  });

  // 登录
  userController.login('18628110404', '123456');

  // 获取当前用户对象
  const curUser = TokenUtil.getCurrentUser();

  // 创建品牌
  const brands = productBrandsController.save({ name: 'Apple', desc: '经营手机、电脑、耳机等数字产品牌' });

  // 创建类别
  const category = productCategoryController.save({ name: '笔记本', desc: '便携袋的微型电脑' });

  // 创建一个spu
  const spu = productSpuController.save({
    brandId: brands.id,
    categoryId: category.id,
    name: 'Mac Book Pro',
    desc: '新一代苹果电脑，超强性能',
    sellingPoint: '超强的性能',
    unit: '台',
    price: '13999.99',
    marketPrice: '14999.99',
  });

  // 创建商品属性，颜色：银色、黑色
  const attr1 = productAttrController.save({
    name: '颜色',
    desc: '颜色',
    values: [
      { value: '银色', desc: '银色' },
      { value: '黑色', desc: '黑色' },
    ],
  });
  // 创建商品属性，屏幕尺寸：13寸、14寸、15寸
  const attr2 = productAttrController.save({
    name: '屏幕尺寸',
    desc: '颜色',
    values: [
      { value: '13寸', desc: '13寸' },
      { value: '14寸', desc: '14寸' },
      { value: '15寸', desc: '15寸' },
    ],
  });
  // 创建sku 银色13寸 1000台
  const sku1 = productSkuController.save({
    spu,
    price: '10999.99',
    marketPrice: '11999.99',
    quantity: 1000,
    attrValues: [attr1.values[0], attr2.values[0]],
  });
  // 创建sku 黑色13寸 500台
  const sku2 = productSkuController.save({
    spu,
    price: '10999.99',
    marketPrice: '11999.99',
    quantity: 500,
    attrValues: [attr1.values[1], attr2.values[0]],
  });
  // 创建sku 银色14寸 1000台
  const sku3 = productSkuController.save({
    spu,
    price: '11999.99',
    marketPrice: '12999.99',
    quantity: 1000,
    attrValues: [attr1.values[0], attr2.values[1]],
  });
  // 创建sku 黑色14寸 500台
  const sku4 = productSkuController.save({
    spu,
    price: '11999.99',
    marketPrice: '12999.99',
    quantity: 500,
    attrValues: [attr1.values[1], attr2.values[1]],
  });
  // 加入购物车100台 Mac pro 黑色14寸
  shoppingCartController.saveSKU(sku4.id, 100);
  shoppingCartController.saveSKU(sku4.id, 100);
  // 加入购物车220台 Mac pro 黑色13寸
  shoppingCartController.saveSKU(sku3.id, 220);

  // 获取购物车的详情，并打印
  const cartDetail = shoppingCartController.getDetail();
  console.log(cartDetail);
  // 购买购物车全部的物品,获取到了一个订单
  const order = shoppingCartController.buyAll();
  // 提交订单给交易系统，获取到可以用的支付方式列表
  const cashRegisterModel = cashRegisterController.pay(order);
  setInterval(() => {
    Logger.log('主线程', '支付剩余时间', parseInt(cashRegisterModel.getTimeRemaining() as any) + '秒');
  }, 1000);
  cashRegisterModel.aliPay();

  // 获取spu详情
  // const spuDetail = productSpuController.getDetail(spu.id);
  // console.log(spuDetail);

  return (
    <div>
      <h1 className={styles.title}>Pa1ge index</h1>
    </div>
  );
}

import styles from './index.less';
import { TradeController } from '../../trade/controller/trade-controller';
import { inject } from '../../core/util/bean-factory';
import { AccountUserController } from '../../account/controller/account-user.controller';
import { TokenUtil } from '../../core/util/token.util';
import { ProductBrandsController } from '../../temporal/controller/product-brands.controller';
import { ProductCategoryController } from '../../temporal/controller/product-category.controller';
import { ProductSpuController } from '../../temporal/controller/product-spu.controller';
import { ProductAttrController } from '../../temporal/controller/product-attr.controller';
import { ProductSkuController } from '../../temporal/controller/product-sku.controller';

export default function IndexPage() {
  const userController = inject<AccountUserController>(AccountUserController);
  const productBrandsController = inject<ProductBrandsController>(ProductBrandsController);
  const productCategoryController = inject<ProductCategoryController>(ProductCategoryController);
  const productSpuController = inject<ProductSpuController>(ProductSpuController);
  const productAttrController = inject<ProductAttrController>(ProductAttrController);
  const productSkuController = inject<ProductSkuController>(ProductSkuController);

  // 注册用户
  userController.register({
    email: 'mhlplus@outlook.com',
    userName: 'Henry',
    phone: '18628110404',
    password: '123456',
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
  productSkuController.save({
    spu,
    price: '10999.99',
    marketPrice: '11999.99',
    quantity: 1000,
    attrValues: [attr1.values[0], attr2.values[0]],
  });
  // 创建sku 黑色13寸 500台
  productSkuController.save({
    spu,
    price: '10999.99',
    marketPrice: '11999.99',
    quantity: 500,
    attrValues: [attr1.values[1], attr2.values[0]],
  });
  // 创建sku 银色14寸 1000台
  productSkuController.save({
    spu,
    price: '11999.99',
    marketPrice: '12999.99',
    quantity: 200,
    attrValues: [attr1.values[0], attr2.values[1]],
  });
  // 创建sku 黑色14寸 500台
  productSkuController.save({
    spu,
    price: '11999.99',
    marketPrice: '12999.99',
    quantity: 200,
    attrValues: [attr1.values[1], attr2.values[1]],
  });
  // 获取spu详情
  const spuDetail = productSpuController.getDetail(spu.id);
  console.log(spuDetail);
  // 从天猫APP获取一个商品，例如MAC BOOK

  const a = inject<TradeController>(TradeController);
  a.goPay();
  return (
    <div>
      <h1 className={styles.title}>Pa1ge index</h1>
    </div>
  );
}

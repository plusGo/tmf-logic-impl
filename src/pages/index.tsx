import styles from './index.less';
import { TradeController } from '../../trade/controller/trade-controller';
import { inject } from '../../core/util/bean-factory';
import { AccountUserController } from '../../account/controller/account-user.controller';
import { TokenUtil } from '../../core/util/token.util';

export default function IndexPage() {
  const userController = inject<AccountUserController>(AccountUserController);

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

  // 从天猫APP获取一个商品，例如MAC BOOK


  const a = inject<TradeController>(TradeController);
  a.goPay();
  return (
    <div>
      <h1 className={styles.title}>Pa1ge index</h1>
    </div>
  );
}

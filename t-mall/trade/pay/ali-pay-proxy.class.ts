import { PayProxyInterface } from './pay-proxy.interface';
import { PayReturnDataInterface } from './pay-return-data.interface';
import { PayParamsInterface } from './pay-params.interface';

export class AliPayProxy implements PayProxyInterface {
  pay(params: PayParamsInterface): PayReturnDataInterface {
    return undefined;
  }
}

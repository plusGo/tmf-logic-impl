import { PayParamsInterface } from './pay-params.interface';
import { PayReturnDataInterface } from './pay-return-data.interface';

/**
 *
 */
export interface PayProxyInterface {
  pay(params: PayParamsInterface): PayReturnDataInterface;
}

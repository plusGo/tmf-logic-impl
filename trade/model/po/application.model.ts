import { BaseModel } from '../../../core/model/po/base.model';

/**
 *  第三方应用
 *  @description 对接交易平台的第三方应用
 */
export interface Application extends BaseModel {
  id: string;
  name: string; // 应用名称
}

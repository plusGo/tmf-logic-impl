import { BaseModel } from '../../../../core/model/po/base.model';

/**
 * 品牌表
 */
export interface ProductBrands extends BaseModel {
  id: string;
  name: string; // 品牌名称
  desc: string; // 品牌描述
}

import { BaseModel } from '../../../../core/model/po/base.model';

/**
 * 产品分类
 */
export interface ProductCategory extends BaseModel {
  id: string;
  name: string; // 分类名称
  desc: string; // 分类描述
}

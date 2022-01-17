/**
 * 创建spu时的模型
 */
export interface SpuSaveRequest {
  brandId: string; // 品牌ID
  categoryId: string; // 分类ID
  name: string; // spu名称
  desc: string; // spu描述
  sellingPoint: string; // 卖点
  unit: string; // spu单位
  price: string; // 售价，如：13428.91
  marketPrice: string; // 市场价,如：13428.91
}

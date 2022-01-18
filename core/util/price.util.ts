export class PriceUtil {
  /**
   * [999,1] => '99.9'
   */
  static transformToString(free: number, scale: number): string {
    const freeStr = `${free}`;
    return `${freeStr.substring(0, freeStr.length - scale)}.${freeStr.substring(freeStr.length - scale)}`;
  }
  /**
   * '99.9' => [999,1]
   */
  static transformToNumber(price: string): number[] {
    return [Number(price.replace('.', '')), price.indexOf('.') === -1 ? 0 : price.length - 1 - price.indexOf('.')];
  }
}

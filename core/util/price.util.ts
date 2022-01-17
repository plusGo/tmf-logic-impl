export class PriceUtil {
  static transform(free: number, scale: number): string {
    const freeStr = `${free}`;
    return `${freeStr.substring(0, freeStr.length - scale)}.${freeStr.substring(freeStr.length - scale)}`;
  }
}

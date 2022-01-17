export class ArrayUtil {
  static unique(array: string[]): string[] {
    return Array.from(new Set(array));
  }
}

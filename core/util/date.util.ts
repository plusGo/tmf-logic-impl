export class DateUtil {
  static plusMinutes(time: number, minutes: number): number {
    return time + minutes * 60 * 1000;
  }
}

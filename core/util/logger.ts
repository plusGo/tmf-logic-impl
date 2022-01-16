export class Logger {
  static log(...args: string[]): void {
    console.log(`${args.join(':')}`);
  };
}

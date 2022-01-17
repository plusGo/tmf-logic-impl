import { v4 as uuidv4 } from 'uuid';

export class IdUtil {
  static UUID(): string {
    return uuidv4();
  }
}

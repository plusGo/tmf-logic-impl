import { UserToken } from '../model/dto/user-token.model';

export class TokenUtil {
  private static cache: UserToken | null;

  static setCurrentUser(token: UserToken): void {
    this.cache = token;
  }

  static getCurrentUser(): UserToken | null {
    return this.cache;
  }

  static removeCurrentUser(): void {
    this.cache = null;
  }
}

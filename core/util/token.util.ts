import { UserToken } from '../model/dto/user-token.model';

export class TokenUtil {
  private static cache: UserToken;

  static setCurrentUser(token: UserToken): void {
    this.cache = token;
  }

  static getCurrentUser(): UserToken {
    return this.cache;
  }
}

import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

const PREFIX = 'lz_';
const TOKEN_KEY = 'token';

@Injectable({ providedIn: 'root' })
export class MyCookiesService {
  constructor(private cookies: CookieService) {
  }

  get(name: string, withoutPrefix?): string {
    const value = this.cookies.get((!withoutPrefix ? PREFIX : '') + name);

    return value === 'undefined' ? null : value;
  }

  put(name: string, val: any): void {
    this.cookies.put(PREFIX + name, val);
  }

  remove(name: string): void {
    this.cookies.remove(PREFIX + name);
  }

  setToken(token: string): void {
    this.put(TOKEN_KEY, token);
  }

  getToken(): string {
    return this.get(TOKEN_KEY);
  }

  removeToken(): void {
    this.remove(TOKEN_KEY);
  }
}

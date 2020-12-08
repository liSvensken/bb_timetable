import { Injectable } from '@angular/core';
import { CookieService } from '@gorniv/ngx-universal';

const PREFIX = 'lz_';

@Injectable({
  providedIn: 'root'
})

export class MyCookiesService {
  constructor(private cookies: CookieService) {}

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
}

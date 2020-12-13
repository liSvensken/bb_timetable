import { AuthApiService } from '@common/services/api/auth-api.service';
import { Injectable } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { take } from 'rxjs/operators';
import { SessionService } from '@common/services/session.service';

@Injectable()
export class AppInitService {
  constructor(private authApiService: AuthApiService,
              private cookiesService: MyCookiesService,
              private sessionService: SessionService) {
  }

  initApp(): Promise<any> {
    return new Promise(resolve => {
      if (this.cookiesService.getToken()) {
        this.authApiService.getMy()
          .pipe(take(1))
          .subscribe(data => {
            if (data) {
              this.sessionService.setCurrentUser(data.result[0]);
            }
            resolve();
          });
      } else {
        resolve();
      }
    });
  }
}

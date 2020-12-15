import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';

@Injectable()
export class IsNotAuthGuard implements CanActivate, CanActivateChild {
  constructor(private myCookiesService: MyCookiesService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!(this.myCookiesService.getToken())) {
      return true;
    } else {
      this.router.navigate(['/search']);
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(childRoute, state);
  }
}

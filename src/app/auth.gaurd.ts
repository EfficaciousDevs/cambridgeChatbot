import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {ChatAPIService} from "./chat-api.service";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private authService: ChatAPIService,
    private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Promise<boolean> {
    let isAuthenticated = this.authService.authorizationStatus;
    if (!isAuthenticated) {
      this.router.navigateByUrl('/login');
    }
    return isAuthenticated;
  }
}

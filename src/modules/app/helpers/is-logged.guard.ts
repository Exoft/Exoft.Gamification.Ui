import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class IsLoggedGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthorized = this.authService.isAuthenticated();
    if (isAuthorized) {
      this.router.navigate(['/']);
    }
    return !isAuthorized;
  }
}

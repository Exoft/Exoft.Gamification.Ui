import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/user.service';
import {Observable} from 'rxjs';
import {map, take, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private userService: UserService) {
  }

  public canActivate(): Observable<boolean> {
    const isAuthorized = this.authService.isAuthenticated();

    return this.userService.getUserData().pipe(
      take(1),
      map(res => isAuthorized && !!res.roles && res.roles.some(role => role === 'Admin')),
      tap(res => {
        if (!res) {
          this.router.navigate(['forbidden']);
        }
      })
    );
  }
}

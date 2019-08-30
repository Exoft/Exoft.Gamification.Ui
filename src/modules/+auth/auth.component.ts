import {Component} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from 'src/modules/app/services/auth/auth.service';
import {UserService} from 'src/modules/app/services/user.service';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  public signinForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });
  public userData: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService) {
  }

  public onSignIn() {
    if (this.signinForm.valid) {
      const {userName, password} = this.signinForm.value;
      const formData = {userName, password};
      this.authService.signIn(formData).subscribe(
        res => {
          const {userName, lastName, firstName, email, xp, status, id} = res;
          this.userData = {
            userName,
            lastName,
            firstName,
            email,
            xp,
            id,
            status,
            avatar: environment.apiUrl + '/api/files/' + res.avatarId
          };
          localStorage.setItem('token', res.token);
          localStorage.setItem('refreshToken', res.refreshToken);
          localStorage.setItem('tokenExpiration', res.tokenExpiration);
          this.router.navigate(['/dashboard']);
          this.userService.setUserData(this.userData);
        },
        error => {
        }
      );
    }
  }
}
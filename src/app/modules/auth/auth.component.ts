import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

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

  constructor(private authService: AuthService, private router: Router, private userService: UserService) {}

  public onSignIn() {
    if (this.signinForm.valid) {
      const { userName, password } = this.signinForm.value;
      const formData = { userName, password };

      this.authService.signIn(formData).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);

          this.userService.getUserInfo().subscribe(userInfoResponse => {
            this.userData = { ...userInfoResponse };
            this.userData.avatar =
            environment.apiUrl + '/api/files/' + this.userData.avatarId;
            this.userService.setUserData(this.userData);
          });
        },
        error => {
          //
        }
      );
    }
  }
}

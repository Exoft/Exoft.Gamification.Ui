import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private authService: AuthService, private router: Router) {}

  public onSignIn() {
    if (this.signinForm.valid) {
      const { userName, password } = this.signinForm.value;
      const formData = { userName, password };

      this.authService.signIn(formData).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/dashboard']);
        },
        error => {
          //
        }
      );
    }
  }
}

import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Router } from '@angular/router';

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

      this.authService.signIn(formData)
      .subscribe(res => {
          localStorage.setItem('accessToken', res.body.accessToken);
          this.router.navigate(['/dashboard']);
        },
        error => {
          //
        });
    }
  }
}

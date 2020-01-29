import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {AuthService} from '../../../app/services/auth.service';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {

  public changePasForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$')
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.{8,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$')
    ]),
  }, [this.checkPasswords]);

  constructor(private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  public checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    const pass = group.get('password').value;
    const confirmPass = group.get('confirmPassword').value;

    return pass === confirmPass ? null : {notSame: true};
  }

  public onResetPassword(): void {
    const changePasData = {
      password: this.changePasForm.value.password,
      secretString: this.activeRoute.snapshot.queryParams.secretString
    };
    this.authService.changePassword(changePasData).subscribe(response => {
        this.openSnackBar('Now try to sign in with your new password', 'Notification');
        setTimeout(() => {
          this.router.navigate(['/sign-in']);
        }, 3000);
      },
      error => {
        const errorPswArray = error.error.Password;
        const errorMsg = errorPswArray.join(' ');
        this.openSnackBar(errorMsg, 'Notification');
      });
  }

  public openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}

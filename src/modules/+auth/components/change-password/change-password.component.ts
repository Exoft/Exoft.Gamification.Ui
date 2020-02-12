import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {AuthService} from '../../../app/services/auth.service';
import {LoadSpinnerService} from '../../../app/services/load-spinner.service';
import {finalize} from 'rxjs/operators';
import {AlertService} from '../../../app/services/alert.service';


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
              private router: Router,
              private readonly loadSpinnerService: LoadSpinnerService,
              private readonly alertService: AlertService) {
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
    this.loadSpinnerService.showSpinner();

    this.authService.changePassword(changePasData)
      .pipe(finalize(() => this.loadSpinnerService.hideSpinner()))
      .subscribe(response => {
          this.alertService.success('Password successfully reset. You can now log in with your new password.');
          setTimeout(() => {
            this.router.navigate(['/sign-in']);
          }, 3000);
        },
        error => {
          this.alertService.error();
        });
  }
}

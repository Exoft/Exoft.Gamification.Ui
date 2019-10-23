import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../../../app/services/auth/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  public changePasForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  constructor(private authService: AuthService,
              private activeRoute: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onResetPassword() {
    const changePasData = {
      password: this.changePasForm.value.password,
      secretString: this.activeRoute.snapshot.queryParams.secretString
    };
    this.authService.changePassword(changePasData).subscribe(response => {
      this.openSnackBar('Now try to sign in with your new password', 'Notification');
      setTimeout(() => {
        this.router.navigate(['/signin']);
      }, 10000);
    },
      error => {
        const errorPswArray = error.error.Password;
        const errorMsg = errorPswArray.join(' ');
        this.openSnackBar(errorMsg, 'Notification');
      });
  }

  public openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }
}

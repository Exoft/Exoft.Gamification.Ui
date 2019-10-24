import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialsModule } from '../shared/modules/angular-materials.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';

@NgModule({
  declarations: [AuthComponent, ForgotPasswordComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialsModule,
    MatSnackBarModule,
    ReactiveFormsModule
  ]
})
export class AuthModule {}

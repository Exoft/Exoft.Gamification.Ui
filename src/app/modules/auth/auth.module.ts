import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { AngularMaterialsModule } from './../../shared/modules/angular-materials.module';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    AngularMaterialsModule,
    ReactiveFormsModule
  ]
})

export class AuthModule {}

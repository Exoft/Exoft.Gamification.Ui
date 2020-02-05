import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialsModule} from './modules/angular-materials.module';
import {ReactiveFormsModule} from '@angular/forms';

import {TimeStampPipe} from './pipes/time-stamp.pipe';
import {CustomDatePipe} from './pipes/custom-date.pipe';

import {EditUserProfileComponent} from './components/edit-user-profile/edit-user-profile.component';
import {EditPasswordComponent} from './components/edit-password/edit-password.component';


@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TimeStampPipe,
    CustomDatePipe,
    EditUserProfileComponent,
    EditPasswordComponent
  ],
  exports: [
    ReactiveFormsModule,
    TimeStampPipe,
    CustomDatePipe,
    EditUserProfileComponent,
    EditPasswordComponent
  ],
  entryComponents: [
    EditUserProfileComponent,
    EditPasswordComponent
  ]
})
export class SharedModule {
}

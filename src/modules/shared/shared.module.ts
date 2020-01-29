import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialsModule} from './modules/angular-materials.module';
import {ReactiveFormsModule} from '@angular/forms';

import {TimeStampPipe} from './pipes/time-stamp.pipe';
import {CustomDatePipe} from './pipes/custom-date.pipe';

import {EditUserProfileComponent} from './components/edit-user-profile/edit-user-profile.component';


@NgModule({
  imports: [
    CommonModule,
    AngularMaterialsModule,
    ReactiveFormsModule
  ],
  declarations: [
    TimeStampPipe,
    CustomDatePipe,
    EditUserProfileComponent
  ],
  exports: [
    ReactiveFormsModule,
    TimeStampPipe,
    CustomDatePipe,
    EditUserProfileComponent
  ],
  entryComponents: [
    EditUserProfileComponent
  ]
})
export class SharedModule {
}

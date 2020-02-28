import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialsModule} from './modules/angular-materials.module';
import {ReactiveFormsModule} from '@angular/forms';
import { Ng5SliderModule } from 'ng5-slider';

import {TimeStampPipe} from './pipes/time-stamp.pipe';
import {CustomDatePipe} from './pipes/custom-date.pipe';

import {EditUserProfileComponent} from './components/edit-user-profile/edit-user-profile.component';
import {EditPasswordComponent} from './components/edit-password/edit-password.component';
import {ThankYouComponent} from './components/thank-you/thank-you.component';


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
    EditPasswordComponent,
    ThankYouComponent
  ],
  exports: [
    ReactiveFormsModule,
    AngularMaterialsModule,
    TimeStampPipe,
    CustomDatePipe,
    EditUserProfileComponent,
    EditPasswordComponent,
    ThankYouComponent,
    Ng5SliderModule
  ],
  entryComponents: [
    EditUserProfileComponent,
    EditPasswordComponent
  ]
})
export class SharedModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeStampPipe } from './pipes/time-stamp.pipe';
import { CustomDatePipe } from './pipes/custom-date.pipe';

@NgModule({
  declarations: [
    TimeStampPipe,
    CustomDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeStampPipe,
    CustomDatePipe
  ]
})
export class SharedModule { }

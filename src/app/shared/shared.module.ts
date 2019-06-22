import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeStampPipe } from './pipes/time-stamp.pipe';

@NgModule({
  declarations: [
    TimeStampPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TimeStampPipe
  ]
})
export class SharedModule { }

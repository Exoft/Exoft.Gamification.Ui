import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from '../shared/modules/angular-materials.module';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponent } from './components/information/information.component';

@NgModule({
  declarations: [InformationComponent],
  imports: [
    CommonModule,
    InformationRoutingModule,
    AngularMaterialsModule
  ]
})
export class InformationModule { }

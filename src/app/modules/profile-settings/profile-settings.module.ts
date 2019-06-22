import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { AngularMaterialsModule } from 'src/app/shared/modules/angular-materials.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { ProfileSettingsComponent } from './profile-settings.component';

@NgModule({
  declarations: [ProfileSettingsComponent],
  imports: [
    CommonModule,
    ProfileSettingsRoutingModule,
    AngularMaterialsModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ProfileSettingsModule {}

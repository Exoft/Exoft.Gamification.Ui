import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProfileSettingsRoutingModule } from './profile-settings-routing.module';
import { AngularMaterialsModule } from 'src/modules/shared/modules/angular-materials.module';
import { SharedModule } from 'src/modules/shared/shared.module';
import { ProfileSettingsComponent } from './components/profile-settings/profile-settings.component';

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

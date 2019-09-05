import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialsModule} from 'src/modules/shared/modules/angular-materials.module';
import {SharedModule} from 'src/modules/shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AdminPageRoutingModule} from './admin-page-routing.module';
import {AdminPageComponent} from './admin-page.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {passwordEqualityValidator} from "./functions/add-user-validators";
import { AddAchievementComponent } from './components/add-achievement/add-achievement.component';
import { EditAchievementComponent } from './components/edit-achievement/edit-achievement.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    AddUserComponent,
    EditUserComponent,
    AddAchievementComponent,
    EditAchievementComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    SharedModule,
    ReactiveFormsModule,
    AdminPageRoutingModule
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent,
    AddAchievementComponent,
    EditAchievementComponent
  ],
})
export class AdminPageModule {
}

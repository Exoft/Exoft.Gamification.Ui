import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularMaterialsModule} from 'src/modules/shared/modules/angular-materials.module';
import {SharedModule} from 'src/modules/shared/shared.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AdminPageRoutingModule} from './admin-page-routing.module';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {AddAchievementComponent} from './components/add-achievement/add-achievement.component';
import {EditAchievementComponent} from './components/edit-achievement/edit-achievement.component';
import {AssignAchievementsComponent} from './components/assign-achievements/assign-achievements.component';
import {ScrollingModule} from '@angular/cdk/scrolling';


@NgModule({
  declarations: [
    AdminPageComponent,
    AddUserComponent,
    EditUserComponent,
    AddAchievementComponent,
    EditAchievementComponent,
    AssignAchievementsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPageRoutingModule,
    ScrollingModule
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent,
    AddAchievementComponent,
    EditAchievementComponent,
    AssignAchievementsComponent
  ],
})
export class AdminPageModule {
}

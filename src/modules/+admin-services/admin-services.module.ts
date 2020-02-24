import {NgModule} from '@angular/core';
import {UsersComponent} from './components/users/users.component';
import {AchievementsComponent} from './components/achievements/achievements.component';
import {AchievementsRequestsComponent} from './components/achievements-requests/achievements-requests.component';
import {SharedModule} from '../shared/shared.module';
import {AddAchievementComponent} from './components/add-achievement/add-achievement.component';
import {AddUserComponent} from './components/add-user/add-user.component';
import {AssignAchievementsComponent} from './components/assign-achievements/assign-achievements.component';
import {EditAchievementComponent} from './components/edit-achievement/edit-achievement.component';
import {EditUserComponent} from './components/edit-user/edit-user.component';
import {CommonModule} from '@angular/common';
import {AdminServicesRoutingModule} from './admin-services-routing.module';

@NgModule({
  declarations: [
    UsersComponent,
    AchievementsComponent,
    AchievementsRequestsComponent,
    AddAchievementComponent,
    AddUserComponent,
    AssignAchievementsComponent,
    EditAchievementComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    AdminServicesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    AddAchievementComponent,
    AddUserComponent,
    AssignAchievementsComponent,
    EditAchievementComponent,
    EditUserComponent
  ]
})
export class AdminServicesModule {
}

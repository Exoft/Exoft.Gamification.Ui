import {NgModule} from '@angular/core';
import {UsersComponent} from './components/users/users.component';
import {AchievementsComponent} from './components/achievements/achievements.component';
import {AchievementsRequestsComponent} from './components/achievements-requests/achievements-requests.component';
import {SharedModule} from '../shared/shared.module';
import {AddAchievementComponent} from './components/modals/add-achievement/add-achievement.component';
import {AddUserComponent} from './components/modals/add-user/add-user.component';
import {AssignAchievementsComponent} from './components/modals/assign-achievements/assign-achievements.component';
import {EditAchievementComponent} from './components/modals/edit-achievement/edit-achievement.component';
import {EditUserComponent} from './components/modals/edit-user/edit-user.component';
import {CommonModule} from '@angular/common';
import {AdminServicesRoutingModule} from './admin-services-routing.module';
import {OrdersComponent} from './components/orders/orders.component';
import {EditOrderComponent} from './components/modals/edit-order/edit-order.component';


@NgModule({
  declarations: [
    UsersComponent,
    AchievementsComponent,
    AchievementsRequestsComponent,
    AddAchievementComponent,
    AddUserComponent,
    AssignAchievementsComponent,
    EditAchievementComponent,
    EditUserComponent,
    OrdersComponent,
    EditOrderComponent
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
    EditUserComponent,
    EditOrderComponent
  ]
})
export class AdminServicesModule {
}

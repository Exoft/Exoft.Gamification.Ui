import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UsersComponent} from './components/users/users.component';
import {AchievementsComponent} from './components/achievements/achievements.component';
import {AchievementsRequestsComponent} from './components/achievements-requests/achievements-requests.component';
import {OrdersComponent} from './components/orders/orders.component';


const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent
  },
  {
    path: 'achievements',
    component: AchievementsComponent
  },
  {
    path: 'achievements-requests',
    component: AchievementsRequestsComponent
  },
  {
    path: 'orders',
    component: OrdersComponent
  },
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full'
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminServicesRoutingModule {
}

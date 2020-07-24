import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {CommonModule} from '@angular/common';
import {CustomerServicesRoutingModule} from './customer-services-routing.module';

import {DashboardBadgesComponent} from './components/dashboard/dashboard-badges/dashboard-badges.component';
import {ChallengesComponent} from './components/dashboard/challenges/challenges.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {ExoftAchievementsComponent} from './components/dashboard/exoft-achievements/exoft-achievements.component';
import {PersonalAchievementsComponent} from './components/dashboard/personal-achievements/personal-achievements.component';
import {TopChartComponent} from './components/dashboard/top-chart/top-chart.component';
import {WelcomeComponent} from './components/dashboard/welcome/welcome.component';
import {BadgesComponent} from './components/badges/badges/badges.component';
import {FullListOfAchievementsComponent} from './components/badges/full-list-of-achievements/full-list-of-achievements.component';
import {LastAchievementsComponent} from './components/badges/last-achievements/last-achievements.component';
import {TotalAchievementsAndExpComponent} from './components/badges/total-achievements-and-exp/total-achievements-and-exp.component';
import {UserComponent} from './components/badges/user/user.component';
import {OrdersComponent} from './components/orders/orders/orders.component';
import {OrderDetailsModalComponent} from './components/orders/order-details-modal/order-details-modal.component';
import {RequestOrderModalComponent} from './components/orders/request-order-modal/request-order-modal.component';

@NgModule({
  declarations: [
    DashboardBadgesComponent,
    ChallengesComponent,
    DashboardComponent,
    ExoftAchievementsComponent,
    PersonalAchievementsComponent,
    TopChartComponent,
    WelcomeComponent,
    BadgesComponent,
    FullListOfAchievementsComponent,
    LastAchievementsComponent,
    TotalAchievementsAndExpComponent,
    UserComponent,
    OrdersComponent,
    OrderDetailsModalComponent,
    RequestOrderModalComponent
  ],
  imports: [
    CommonModule,
    CustomerServicesRoutingModule,
    SharedModule
  ],
  entryComponents: [
    OrderDetailsModalComponent,
    RequestOrderModalComponent
  ]
})
export class CustomerServicesModule {
}

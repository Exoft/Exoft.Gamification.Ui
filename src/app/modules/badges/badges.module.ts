import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesRoutingModule } from './badges-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AngularMaterialsModule } from './../../shared/modules/angular-materials.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { BadgesComponent } from './badges.component';
import { LastAchievementsComponent } from './components/last-achievements/last-achievements.component';
import { TotalAchievementsAndExpComponent } from './components/total-achievements-and-exp/total-achievements-and-exp.component';
import { UserComponent } from './components/user/user.component';
import { FullListOfAchievementsComponent } from './components/full-list-of-achievements/full-list-of-achievements.component';

@NgModule({
  declarations: [
    BadgesComponent,
    LastAchievementsComponent,
    TotalAchievementsAndExpComponent,
    UserComponent,
    FullListOfAchievementsComponent
  ],
  imports: [
    CommonModule,
    BadgesRoutingModule,
    DashboardModule,
    AngularMaterialsModule,
    SharedModule
  ]
})
export class BadgesModule {}

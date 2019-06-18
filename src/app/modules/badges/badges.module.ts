import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgesRoutingModule } from './badges-routing.module';
import { DashboardModule } from '../dashboard/dashboard.module';
import { AngularMaterialsModule } from './../../shared/modules/angular-materials.module';

import { BadgesComponent } from './badges.component';
import { LastAchivementsComponent } from './components/last-achivements/last-achivements.component';
import { TotalAchivementsAndExpComponent } from './components/total-achivements-and-exp/total-achivements-and-exp.component';
import { UserComponent } from './components/user/user.component';
import { FullListOfAchivementsComponent } from './components/full-list-of-achivements/full-list-of-achivements.component';

@NgModule({
  declarations: [
    BadgesComponent,
    LastAchivementsComponent,
    TotalAchivementsAndExpComponent,
    UserComponent,
    FullListOfAchivementsComponent
  ],
  imports: [
    CommonModule,
    BadgesRoutingModule,
    DashboardModule,
    AngularMaterialsModule
  ]
})
export class BadgesModule {}

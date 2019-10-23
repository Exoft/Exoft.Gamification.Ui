// Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AngularMaterialsModule } from '../shared/modules/angular-materials.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

// Components
import { DashboardComponent } from './dashboard.component';
import { TopChartComponent } from './components/top-chart/top-chart.component';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PersonalAchievementsComponent } from './components/personal-achievements/personal-achievements.component';
import { ExoftAchievementsComponent } from './components/exoft-achievements/exoft-achievements.component';
import { BadgesComponent } from './components/badges/badges.component';
import { ChallengesComponent } from './components/challenges/challenges.component';

@NgModule({
  declarations: [
    DashboardComponent,
    TopChartComponent,
    ThankYouComponent,
    WelcomeComponent,
    PersonalAchievementsComponent,
    ExoftAchievementsComponent,
    BadgesComponent,
    ChallengesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [ThankYouComponent]
})
export class DashboardModule {}

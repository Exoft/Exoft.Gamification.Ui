import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { TopChartComponent } from './components/top-chart/top-chart.component';
import { AngularMaterialsModule } from './../../shared/modules/angular-materials.module';
import { ThankYouComponent } from './components/thank-you/thank-you.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { PersonalAchievementsComponent } from './components/personal-achievements/personal-achievements.component';
import { ExoftAchievementsComponent } from './components/exoft-achievements/exoft-achievements.component';
import { BadgesComponent } from './components/badges/badges.component';
import { ChallengesComponent } from './components/challenges/challenges.component';
import { OtherUserProfileComponent } from './components/other-user-profile/other-user-profile.component';
import {SharedModule} from '../../shared/shared.module';
import { GratitudeComponent } from './components/gratitude/gratitude.component';
import { RequestAchievementComponent } from './components/request-achievement/request-achievement.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DashboardComponent,
    TopChartComponent,
    ThankYouComponent,
    WelcomeComponent,
    PersonalAchievementsComponent,
    ExoftAchievementsComponent,
    BadgesComponent,
    ChallengesComponent,
    OtherUserProfileComponent,
    GratitudeComponent,
    RequestAchievementComponent
  ],
  entryComponents: [
    OtherUserProfileComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialsModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [
    ThankYouComponent
  ]
})
export class DashboardModule {
}

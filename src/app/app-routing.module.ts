import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule'
  },
  {
    path: 'authorization',
    loadChildren: './modules/auth/auth.module#AuthModule'
  },
  {
    path: 'badges',
    loadChildren: './modules/badges/badges.module#BadgesModule'
  },
  {
    path: 'information',
    loadChildren: './modules/information/information.module#InformationModule'
  },
  {
    path: 'challenges',
    loadChildren: './modules/challenges/challenges.module#ChallengesModule'
  },
  {
    path: 'topchart',
    loadChildren: './modules/top-chart/top-chart.module#TopChartModule'
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

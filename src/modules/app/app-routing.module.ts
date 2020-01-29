import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {IsLoggedGuard} from './helpers/is-logged.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'sign-in',
    loadChildren: '../+auth/auth.module#AuthModule',
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'dashboard',
    loadChildren: '../+dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'badges',
    loadChildren: '../+badges/badges.module#BadgesModule',
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'information',
  //   loadChildren: '../+information/information.module#InformationModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'challenges',
  //   loadChildren: '../+challenges/challenges.module#ChallengesModule',
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'top-chart',
  //   loadChildren: '../+top-chart/top-chart.module#TopChartModule',
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'admin',
    loadChildren: '../+admin-page/admin-page.module#AdminPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'page-not-found'
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

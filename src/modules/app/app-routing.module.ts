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
    loadChildren: () => import('../+auth/auth.module').then(m => m.AuthModule),
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('../+dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'badges',
    loadChildren: () => import('../+badges/badges.module').then(m => m.BadgesModule),
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
    loadChildren: () => import('../+admin-page/admin-page.module').then(m => m.AdminPageModule),
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

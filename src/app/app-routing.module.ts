import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './services/auth/authguard.service';
import { IsLoggedGuard } from './services/auth/isloggedguard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    loadChildren: './modules/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'signin',
    loadChildren: './modules/auth/auth.module#AuthModule',
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'badges',
    loadChildren: './modules/badges/badges.module#BadgesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'information',
    loadChildren: './modules/information/information.module#InformationModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'challenges',
    loadChildren: './modules/challenges/challenges.module#ChallengesModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'topchart',
    loadChildren: './modules/top-chart/top-chart.module#TopChartModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'admin',
    loadChildren: './modules/admin-page/admin-page.module#AdminPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'profile-settings',
    loadChildren: './modules/profile-settings/profile-settings.module#ProfileSettingsModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'page-not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: '/page-not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

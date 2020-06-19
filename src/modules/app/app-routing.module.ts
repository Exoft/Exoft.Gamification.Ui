import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthGuard} from './helpers/auth.guard';
import {IsLoggedGuard} from './helpers/is-logged.guard';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {ForbiddenPageComponent} from './components/forbidden-page/forbidden-page.component';
import {AdminRoleGuard} from './helpers/admin-role.guard';
import {CustomerRoleGuard} from './helpers/customer-role.guard';

const routes: Routes = [
  {
    path: 'sign-in',
    loadChildren: () => import('../+auth/auth.module').then(m => m.AuthModule),
    canActivate: [IsLoggedGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import('../+customer-services/customer-services.module').then(m => m.CustomerServicesModule),
    canActivate: [AuthGuard, CustomerRoleGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import('../+admin-services/admin-services.module').then(m => m.AdminServicesModule),
    canActivate: [AuthGuard, AdminRoleGuard]
  },
  {
    path: '',
    redirectTo: 'customer',
    pathMatch: 'full'
  },
  {
    path: 'forbidden',
    component: ForbiddenPageComponent
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

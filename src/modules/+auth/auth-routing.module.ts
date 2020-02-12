import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {SignInComponent} from './components/sign-in/sign-in.component';
import {ForgotPasswordComponent} from './components/forgot-password/forgot-password.component';
import {ChangePasswordComponent} from './components/change-password/change-password.component';

const routes: Routes = [
  {
    path: '',
    component: SignInComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}

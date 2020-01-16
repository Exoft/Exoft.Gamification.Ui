import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './components/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: '',
    component: AdminPageComponent
  }
];


@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AdminPageRoutingModule {
}

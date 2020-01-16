import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {BadgesComponent} from './components/badges/badges.component';

const routes: Routes = [
  {
    path: '',
    component: BadgesComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BadgesRoutingModule {
}

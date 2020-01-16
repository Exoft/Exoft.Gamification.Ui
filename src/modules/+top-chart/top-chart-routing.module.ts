import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {TopChartComponent} from './components/top-chart/top-chart.component';

const routes: Routes = [{
  path: '',
  component: TopChartComponent
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopChartRoutingModule {
}

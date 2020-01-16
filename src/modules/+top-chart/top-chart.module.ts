import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {TopChartRoutingModule} from './top-chart-routing.module';
import {TopChartComponent} from './components/top-chart/top-chart.component';


@NgModule({
  declarations: [TopChartComponent],
  imports: [
    CommonModule,
    TopChartRoutingModule
  ]
})
export class TopChartModule {
}

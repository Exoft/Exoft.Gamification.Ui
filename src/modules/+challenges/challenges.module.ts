import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChallengesRoutingModule} from './challenges-routing.module';
import {ChallengesComponent} from './components/challenges/challenges.component';


@NgModule({
  declarations: [ChallengesComponent],
  imports: [
    CommonModule,
    ChallengesRoutingModule
  ]
})
export class ChallengesModule {
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminPageComponent } from './admin-page.component';

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

export class AdminPageRoutingModule { }

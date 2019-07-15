import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialsModule } from 'src/app/shared/modules/angular-materials.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminPageRoutingModule } from './admin-page-routing.module';
import { AdminPageComponent } from './admin-page.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';

@NgModule({
  declarations: [AdminPageComponent,
    AddUserComponent,
    EditUserComponent],
  imports: [
    CommonModule,
    AngularMaterialsModule,
    SharedModule,
    ReactiveFormsModule,
    AdminPageRoutingModule
  ],
  entryComponents: [
    AddUserComponent,
    EditUserComponent
  ],
})
export class AdminPageModule { }

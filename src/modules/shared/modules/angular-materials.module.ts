import {NgModule} from '@angular/core';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatStepperModule,
  MatDialogModule,
  MatProgressBarModule, MatCheckboxModule
} from '@angular/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  imports:[
  ],
  exports: [
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
    MatStepperModule,
    MatInputModule,
    MatDialogModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTableModule,
    MatCheckboxModule
  ]
})
export class AngularMaterialsModule {
}

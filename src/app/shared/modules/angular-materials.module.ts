import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule,
     MatListModule, MatCardModule, MatStepperModule} from '@angular/material';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
    exports: [
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatTabsModule,
        MatCardModule,
        MatStepperModule
    ]
})
export class AngularMaterialsModule { }

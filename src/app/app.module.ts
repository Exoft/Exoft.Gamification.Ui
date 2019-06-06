// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from './shared/modules/angular-materials.module';

// Components
import { AppComponent } from './app.component';
import { MainnavComponent } from './components/mainnav/mainnav.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, MainnavComponent, HeaderComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialsModule } from './shared/modules/angular-materials.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Interceptor
import { Interceptor } from './services/auth/interceptor';

// Components
import { AppComponent } from './app.component';
import { MainnavComponent } from './components/mainnav/mainnav.component';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OtherUserProfileComponent } from './modules/dashboard/components/other-user-profile/other-user-profile.component';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { GratitudeComponent } from './modules/dashboard/components/gratitude/gratitude.component';
import { RequestAchievementComponent } from './modules/dashboard/components/request-achievement/request-achievement.component';

@NgModule({
  declarations: [
    AppComponent,
    MainnavComponent,
    HeaderComponent,
    NotFoundComponent
  ],
   imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    HttpClientModule,
    DashboardModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  entryComponents: [OtherUserProfileComponent,
  GratitudeComponent,
  RequestAchievementComponent
],
  bootstrap: [AppComponent]
})
export class AppModule {}

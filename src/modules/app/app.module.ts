// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialsModule} from '../shared/modules/angular-materials.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';

// Interceptor
import {Interceptor} from './helpers/interceptor';

// Components
import {AppComponent} from './components/app/app.component';
import {MainnavComponent} from './components/mainnav/mainnav.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {OtherUserProfileComponent} from './components/other-user-profile/other-user-profile.component';
import {RequestAchievementComponent} from './components/request-achievement/request-achievement.component';
import {GratitudeComponent} from './components/gratitude/gratitude.component';


@NgModule({
  declarations: [
    AppComponent,
    MainnavComponent,
    HeaderComponent,
    NotFoundComponent,
    OtherUserProfileComponent,
    RequestAchievementComponent,
    GratitudeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    }
  ],
  entryComponents: [
    OtherUserProfileComponent,
    RequestAchievementComponent,
    GratitudeComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

// Modules
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AngularMaterialsModule} from '../shared/modules/angular-materials.module';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

// Interceptor
import {Interceptor} from './services/auth/interceptor';

// Components
import {AppComponent} from './app.component';
import {MainnavComponent} from './components/mainnav/mainnav.component';
import {HeaderComponent} from './components/header/header.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {OtherUserProfileComponent} from '../+dashboard/components/other-user-profile/other-user-profile.component';
import {DashboardModule} from '../+dashboard/dashboard.module';
import {GratitudeComponent} from '../+dashboard/components/gratitude/gratitude.component';
import {RequestAchievementComponent} from '../+dashboard/components/request-achievement/request-achievement.component';
import {AdminPageModule} from '../+admin-page/admin-page.module';
import {AddUserComponent} from '../+admin-page/components/add-user/add-user.component';
import {EditUserComponent} from '../+admin-page/components/edit-user/edit-user.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


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
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

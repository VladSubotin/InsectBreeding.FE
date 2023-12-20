import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FoddersComponent } from './components/fodders/fodders.component';
import { FodderComponent } from './components/fodder/fodder.component';
import { UserComponent } from './components/user/user.component';
import { InsectsComponent } from './components/insects/insects.component';
import { InsectComponent } from './components/insect/insect.component';
import { LivingPlacesComponent } from './components/living-places/living-places.component';
import { LivingPlaceComponent } from './components/living-place/living-place.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    FoddersComponent,
    FodderComponent,
    UserComponent,
    InsectsComponent,
    InsectComponent,
    LivingPlacesComponent,
    LivingPlaceComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: 'ua'
    })
  ],
  providers: [],
  bootstrap: [AppComponent,
    FoddersComponent,
    FodderComponent,
    UserComponent,
    InsectsComponent,
    InsectComponent,
    LivingPlacesComponent,
    LivingPlaceComponent,
    LoginComponent,
    RegistrationComponent]
})
export class AppModule { }
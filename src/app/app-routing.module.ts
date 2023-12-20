import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoddersComponent } from './components/fodders/fodders.component';
import { FodderComponent } from './components/fodder/fodder.component';
import { InsectComponent } from './components/insect/insect.component';
import { InsectsComponent } from './components/insects/insects.component';
import { LivingPlacesComponent } from './components/living-places/living-places.component';
import { LivingPlaceComponent } from './components/living-place/living-place.component';
import { UserComponent } from './components/user/user.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';

const routes: Routes = [
  {path: 'user', component: UserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'fodders', component: FoddersComponent},
  {path: 'fodder/:id', component: FodderComponent},
  {path: 'insects', component: InsectsComponent},
  {path: 'insect/:id', component: InsectComponent},
  {path: 'livingPlaces', component: LivingPlacesComponent},
  {path: 'livingPlace/:id', component: LivingPlaceComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

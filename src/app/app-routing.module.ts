import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {AuthGuard} from './authentication/auth-guard';

const routes: Routes = [
  // {path: '**', redirectTo: 'LinkedWay'},
  {path: '', redirectTo: 'LinkedWay', pathMatch: 'full'},
  {path: 'LinkedWay', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

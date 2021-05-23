import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './component/login/login.component';
import {HomeComponent} from './component/home/home.component';
import {RegistrationComponent} from './component/registration/registration.component';
import {AuthGuard} from './authentication/auth-guard';
import {TaskComponent} from './component/task/task.component';
import {SearchComponent} from './component/search/search.component';
import {FriendRequestsComponent} from './component/friend-requests/friend-requests.component';
import {FriendComponent} from './component/friend/friend.component';
import {ChatComponent} from './component/chat/chat.component';

const routes: Routes = [
  // {path: '**', redirectTo: 'LinkedWay'},
  {path: '', redirectTo: 'LinkedWay', pathMatch: 'full'},
  {path: 'LinkedWay', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'task/:programming-language', component: TaskComponent, canActivate: [AuthGuard]},
  {path: 'search/:programming-language', component: SearchComponent, canActivate: [AuthGuard]},
  {path: 'friendRequests', component: FriendRequestsComponent, canActivate: [AuthGuard]},
  {path: 'friends', component: FriendComponent, canActivate: [AuthGuard]},
  {path: 'chat', component: ChatComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}

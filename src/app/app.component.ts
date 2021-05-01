import {Component} from '@angular/core';
import {User} from './model/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  currentUser: User | undefined;
  title = 'LinkedWay';

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    if (this.authenticationService.currentUser) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}

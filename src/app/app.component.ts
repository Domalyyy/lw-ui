import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './model/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication/authentication.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSidenav} from '@angular/material/sidenav';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  currentUser: User | undefined;
  title = 'LinkedWay';
  sidenav: MatSidenav | undefined;
  userRole: string | undefined;

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private ngxSpinnerService: NgxSpinnerService,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.userRole = String(this.cookieService.get('userRole'));

    if (this.authenticationService.currentUser) {
      this.subscriptions.push(
        this.authenticationService
          .currentUser
          .subscribe(
            (sessionUser) => {
              this.currentUser = sessionUser;

              if (this.currentUser) {
                this.ngxSpinnerService.hide();
              }
            },
            () => {
              this.ngxSpinnerService.hide();
            }),
      );
    } else {
      this.ngxSpinnerService.hide();
    }
  }

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }
}

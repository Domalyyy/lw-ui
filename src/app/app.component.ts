import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from './model/user';
import {Router} from '@angular/router';
import {AuthenticationService} from './service/authentication/authentication.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatSidenav} from '@angular/material/sidenav';

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

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private ngxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();

    if (this.authenticationService.currentUser) {
      this.subscriptions.push(
        this.authenticationService
          .currentUser
          .subscribe(
            (sessionUser) => {
              this.currentUser = sessionUser;
              console.log(this.currentUser);

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

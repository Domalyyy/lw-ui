import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../../service/user/user.service';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  userId: number | undefined;
  completedTasksCount: number | undefined;
  needCount: number | undefined;
  gradation: any | undefined;
  userRole: string | undefined;

  constructor(private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.userId = Number(this.cookieService.get('userId'));
    this.userRole = String(this.cookieService.get('userRole'));

    this.subscriptions.push(
      this.userService.getCompletedTasksCountByUserId(this.userId).subscribe((data: any) => {
          if (data) {
            this.completedTasksCount = data;
            this.ngxSpinnerService.hide();
          }
        },
        () => {
          this.ngxSpinnerService.hide();
        }
      )
    );

    this.subscriptions.push(
      this.userService.getGradationByUserId(this.userId).subscribe((data: any) => {
          if (data) {
            this.gradation = data.body;
            this.ngxSpinnerService.hide();
          }
        },
        () => {
          this.ngxSpinnerService.hide();
        }
      )
    );

    this.subscriptions.push(
      this.userService.getNeededCountByUserId(this.userId).subscribe((data: any) => {
          if (data) {
            this.needCount = data;
            this.ngxSpinnerService.hide();
          }
        },
        () => {
          this.ngxSpinnerService.hide();
        }
      )
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }
}

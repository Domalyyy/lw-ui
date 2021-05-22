import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-friend-requests',
  templateUrl: './friend-requests.component.html',
  styleUrls: ['./friend-requests.component.scss']
})
export class FriendRequestsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  users: any[] | undefined;
  userId: number | undefined;

  constructor(private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.findRequest();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  private findRequest(): void {
    this.ngxSpinnerService.show();
    if (this.userId) {
      this.subscriptions.push(
        this.userService.getFriendRequests(this.userId).subscribe((data: any) => {
            this.users = data;
            this.ngxSpinnerService.hide();
          },
          () => {
            this.ngxSpinnerService.hide();
          })
      );
    }
  }

  submit(userId: number): void {
    if (this.userId) {
      this.userService.submitFriendRequest(userId, this.userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.findRequest();
      });
    }
  }

  cancel(userId: number): void {
    if (this.userId) {
      this.userService.deleteFriendRequests(userId, this.userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.findRequest();
      });
    }
  }
}

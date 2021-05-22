import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../service/user/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'gradation', 'completedTasks', 'generalCompletedTasks', 'action'];
  users: any[] | undefined;
  programmingLanguage: string | undefined;
  userId: number | undefined;

  constructor(private route: Router,
              private activatedRoute: ActivatedRoute,
              private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.userId = Number(this.cookieService.get('userId'));

    this.subscriptions.push(
      this.activatedRoute.params.subscribe(params => {
        this.ngxSpinnerService.show();
        this.programmingLanguage = params['programming-language'];
        this.findPeople();
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  private findPeople(): void {
    this.ngxSpinnerService.hide();
    if (this.programmingLanguage && this.userId) {
      this.subscriptions.push(
        this.userService.getUsersByProgrammingLanguage(this.programmingLanguage, this.userId).subscribe((data: any) => {
            this.users = data;
            this.ngxSpinnerService.hide();
          },
          () => {
            this.ngxSpinnerService.hide();
          })
      );
    }
  }

  sendFriendRequest(userId: number): void {
    if (this.userId) {
      this.userService.sendFriendRequest(userId, this.userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.findPeople();
      });
    }
  }

  cancelFriendRequest(userId: number): void {
    if (this.userId) {
      this.userService.cancelFriendRequest(userId, this.userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.findPeople();
      });
    }
  }

  removeFriend(userId: number): void {
    if (this.userId) {
      this.userService.deleteFriend(this.userId, userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.findPeople();
      });
    }
  }
}

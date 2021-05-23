import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {UserService} from '../../service/user/user.service';
import {MatDialog} from '@angular/material/dialog';
import {MiniChatComponent} from '../mini-chat/mini-chat.component';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class FriendComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'action'];
  users: any[] | undefined;
  userId: number | undefined;

  constructor(private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              public dialog: MatDialog,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.getFriends();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  private getFriends(): void {
    this.ngxSpinnerService.show();
    if (this.userId) {
      this.subscriptions.push(
        this.userService.getFriends(this.userId).subscribe((data: any) => {
            this.users = data;
            this.ngxSpinnerService.hide();
          },
          () => {
            this.ngxSpinnerService.hide();
          })
      );
    }
  }

  remove(userId: number): void {
    if (this.userId) {
      this.userService.deleteFriend(this.userId, userId).subscribe(() => {
        this.ngxSpinnerService.show();
        this.getFriends();
      });
    }
  }

  sendMessage(userId: number): void {
    this.dialog.open(MiniChatComponent).componentInstance.recipientId = userId;
  }
}

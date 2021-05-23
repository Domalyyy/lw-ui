import {Component, OnDestroy, OnInit} from '@angular/core';
import {MessagingService} from '../../service/messaging/messaging.service';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {
  panelOpenState = false;
  subscriptions: Subscription[] = [];
  messages: any[] | undefined;
  dialogs: any[] | undefined;
  userId: number | undefined;

  constructor(private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.userId = Number(this.cookieService.get('userId'));

    this.getMessages();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  private getMessages(): void {
    if (this.userId) {
      this.ngxSpinnerService.show();

      this.subscriptions.push(
        this.messagingService.getMessages(this.userId).subscribe((data: any) => {
          this.messages = data;

          this.ngxSpinnerService.hide();
        })
      );
    }
  }

  getDialogs(firstUserId: number, secondUserId: number): any {
    let recipientId = 0;
    if (this.userId === firstUserId) {
      recipientId = secondUserId;
    }
    if (this.userId === secondUserId) {
      recipientId = firstUserId;
    }
    if (this.panelOpenState) {
      this.ngxSpinnerService.show();
    }
    if (this.userId) {
      this.subscriptions.push(
        this.messagingService.getDialog(this.userId, recipientId).subscribe((data: any) => {
          this.dialogs = data;
          this.ngxSpinnerService.hide();
        })
      );
    } else {
      this.ngxSpinnerService.hide();
    }
  }

  send(userId: number, messageBody: string): void {
    const message: any = {
      sender: this.userId,
      recipient: userId,
      body: messageBody
    };
    this.messagingService.sendMessages(message).subscribe(() => {
    });
  }
}

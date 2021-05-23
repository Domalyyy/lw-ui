import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {NgxSpinnerService} from 'ngx-spinner';
import {MessagingService} from '../../service/messaging/messaging.service';

@Component({
  selector: 'app-mini-chat',
  templateUrl: './mini-chat.component.html',
  styleUrls: ['./mini-chat.component.scss']
})
export class MiniChatComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  dialogs: any[] | undefined;
  userId: number | undefined;
  recipientId: number | undefined;

  constructor(private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService,
              private messagingService: MessagingService) {
  }

  ngOnInit(): void {
    this.userId = Number(this.cookieService.get('userId'));
    this.getDialogs();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  getDialogs(): void {
    if (this.userId && this.recipientId) {
      this.subscriptions.push(
        this.messagingService.getDialog(this.userId, this.recipientId).subscribe((data: any) => {
          this.dialogs = data;
          this.ngxSpinnerService.hide();
        })
      );
    }
  }

  send(messageBody: string): void {
    const message: any = {
      sender: this.userId,
      recipient: this.recipientId,
      body: messageBody
    };
    this.messagingService.sendMessages(message).subscribe(() => {
    });
  }
}

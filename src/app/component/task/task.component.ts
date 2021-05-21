import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../service/task/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Task} from '../../model/task';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../model/answer';
import {NotificationService} from '../../service/notification/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  tasks: Task[] = [];
  userId: number | undefined;
  programmingLanguage: string | undefined;
  isLinear = false;
  formGroup: FormGroup = new FormGroup({
    th0: new FormControl(['', Validators.required]),
    th1: new FormControl(['', Validators.required]),
    th2: new FormControl(['', Validators.required]),
    th3: new FormControl(['', Validators.required]),
    th4: new FormControl(['', Validators.required]),
    th5: new FormControl(['', Validators.required]),
    th6: new FormControl(['', Validators.required]),
    th7: new FormControl(['', Validators.required]),
    th8: new FormControl(['', Validators.required]),
    th9: new FormControl(['', Validators.required])
  });

  constructor(private taskService: TaskService,
              private route: Router,
              private activatedRoute: ActivatedRoute,
              private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private cookieService: CookieService,
              private ngxSpinnerService: NgxSpinnerService) {
  }

  ngOnInit(): void {
    this.ngxSpinnerService.show();
    this.userId = Number(this.cookieService.get('userId'));
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(params => {
        this.programmingLanguage = params['programming-language'];
      })
    );

    this.getTasks();
  }

  submit(): void {
    this.ngxSpinnerService.show();
    if (!this.formGroup.invalid) {
      const answers: string[] = [];
      for (const controlsKey in this.formGroup.controls) {
        if (typeof this.formGroup.controls[controlsKey].value === 'string') {
          answers.push(this.formGroup.controls[controlsKey].value);
        }
      }
      const answer: Answer = {
        userId: this.userId,
        userAnswers: answers
      };

      this.subscriptions.push(
        this.taskService.submit(answer).subscribe(data => {
            this.notificationService.notifySuccess('Правильні відповіді: ' + data);
            this.getTasks();
            this.formGroup = new FormGroup({
              th0: new FormControl(['', Validators.required]),
              th1: new FormControl(['', Validators.required]),
              th2: new FormControl(['', Validators.required]),
              th3: new FormControl(['', Validators.required]),
              th4: new FormControl(['', Validators.required]),
              th5: new FormControl(['', Validators.required]),
              th6: new FormControl(['', Validators.required]),
              th7: new FormControl(['', Validators.required]),
              th8: new FormControl(['', Validators.required]),
              th9: new FormControl(['', Validators.required])
            });

            this.ngxSpinnerService.hide();
          },
          () => {
            this.ngxSpinnerService.hide();
          })
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });

    this.ngxSpinnerService.hide();
  }

  private getTasks(): void {
    this.ngxSpinnerService.show();
    if (this.programmingLanguage && this.userId) {
      this.subscriptions.push(
        this.taskService.getTasks(this.programmingLanguage, this.userId).subscribe((tasks: Task[]) => {
            if (tasks) {
              this.tasks = tasks;
            }
            this.ngxSpinnerService.hide();
          },
          () => {
            this.ngxSpinnerService.hide();
          })
      );
    }
  }
}

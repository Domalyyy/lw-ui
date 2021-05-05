import {Component, OnDestroy, OnInit} from '@angular/core';
import {TaskService} from '../../service/task/task.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Task} from '../../model/task';
import {User} from '../../model/user';
import {Subscription} from 'rxjs';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Answer} from '../../model/answer';
import {NotificationService} from '../../service/notification/notification.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  tasks: Task[] = [];
  currentUser: User | undefined;
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
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(params => {
        this.programmingLanguage = params['programming-language'];
      })
    );

    if (this.authenticationService.currentUser) {
      this.subscriptions.push(
        this.authenticationService.currentUser?.subscribe((user: any) => {
          this.currentUser = user;
        })
      );
    }

    this.getTasks();
  }

  submit(): void {
    if (!this.formGroup.invalid) {
      const answers: string[] = [];
      for (const controlsKey in this.formGroup.controls) {
        if (typeof this.formGroup.controls[controlsKey].value === 'string') {
          answers.push(this.formGroup.controls[controlsKey].value);
        }
      }
      const answer: Answer = {
        userId: this.currentUser?.id,
        userAnswers: answers
      };

      this.subscriptions.push(
        this.taskService.submit(answer).subscribe(data => {
          this.notificationService.notifySuccess('Правильні відповіді: ' + data);
          this.getTasks();
        })
      );
    }
  }

  shuffle(): string[] {
    if (Math.random() > 0.5) {
      return ['correctAnswer', 'wrongAnswer'];
    } else {
      return ['wrongAnswer', 'correctAnswer'];
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    });
  }

  private getTasks(): void {
    if (this.programmingLanguage && this.currentUser && this.currentUser.id) {
      this.subscriptions.push(
        this.taskService.getTasks(this.programmingLanguage, this.currentUser.id).subscribe((tasks: Task[]) => {
          this.tasks = tasks;
        })
      );
    }
  }
}

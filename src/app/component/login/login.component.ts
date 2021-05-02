import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {NotificationService} from '../../service/notification/notification.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  returnUrl?: string;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private authenticationService: AuthenticationService,
              private matSnackBar: MatSnackBar,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private notificationService: NotificationService) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/';
  }

  login(): void {
    if (!this.loginForm.invalid) {
      this.subscriptions.push(
        this.authenticationService
          .login(this.loginForm.controls.username.value, this.loginForm.controls.password.value)
          .pipe(first())
          .subscribe(
            () => {
              this.router.navigate([this.returnUrl]);
              location.href = this.returnUrl as string;
            },
            () => {
              this.notificationService.notifyFailure('Логін або пароль було введено неправильно.');
            }
          )
      );
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

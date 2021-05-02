import {Component, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserRegistrationDTO} from '../../model/user-registrationDTO';
import {MatSelect} from '@angular/material/select';
import {HttpErrorResponse} from '@angular/common/http';
import {NotificationService} from '../../service/notification/notification.service';
import {AuthenticationService} from '../../service/authentication/authentication.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnDestroy {
  subscriptions: Subscription[] = [];
  recruiterReason = 'Шукаю працівника';
  userReason = 'Шукаю роботу';
  Reason: any = [this.recruiterReason, this.userReason];
  @ViewChild('reasonValue') matSelect: MatSelect | undefined;

  registerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.required,
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required
    ]),
    role: new FormControl('', [
      Validators.required
    ]),
  });

  constructor(private authenticationService: AuthenticationService,
              private notificationService: NotificationService,
              private router: Router,
              private ngxSpinnerService: NgxSpinnerService) {
  }

  register(): void {
    if (!this.registerForm.invalid) {
      this.ngxSpinnerService.show();
      const user = this.buildUserRegistrationDTO();

      this.subscriptions.push(
        this.authenticationService.register(user).subscribe(
          () => {
            this.ngxSpinnerService.hide();
            this.router.navigate(['/']);
            location.href = '/';
            this.notificationService.notifySuccess('Ви успішно зареєструвались');
          },
          (httpErrorResponse: HttpErrorResponse) => {
            this.ngxSpinnerService.hide();
            if (httpErrorResponse.status === 400) {
              this.notificationService.notifyFailure('Ця електронна адреса вже зайнята');
            } else {
              this.notificationService.notifyFailure();
            }
          })
      );
    }
  }

  private buildUserRegistrationDTO(): UserRegistrationDTO {
    let role;
    if (this.matSelect?.value === this.recruiterReason) {
      role = 'RECRUITER';
    }
    if (this.matSelect?.value === this.userReason) {
      role = 'USER';
    }

    return {
      firstName: this.registerForm.controls.firstName.value,
      lastName: this.registerForm.controls.lastName.value,
      email: this.registerForm.controls.email.value,
      password: this.registerForm.controls.password.value,
      role,
    };
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AuthenticationService} from '../service/authentication/authentication.service';
import {NotificationService} from '../service/notification/notification.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private ngxSpinnerService: NgxSpinnerService,
              private notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(error => {
      if (error.status === 0) {
        this.notificationService.notifyFailure();
      }
      if (error.status === 500) {
        this.notificationService.notifyFailure();
      }
      if (error.status === 401) {
        this.notificationService.notifyFailure('Логін або пароль було введено неправильно.');
        this.authenticationService.logout();
      }

      this.ngxSpinnerService.hide();
      return throwError(error);
    }));
  }
}

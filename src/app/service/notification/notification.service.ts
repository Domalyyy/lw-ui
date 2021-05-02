import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  messageGeneralFailure = 'Щось пішло не так. Спробуйте, будь ласка, пізніше';

  constructor(private matSnackBar: MatSnackBar) {
  }

  notifySuccess(message: string): void {
    this.matSnackBar.open(message, '', {
      duration: 2500,
      panelClass: ['success-snackbar'],
      verticalPosition: 'top'
    });
  }

  notifyFailure(message: string = this.messageGeneralFailure): void {
    this.matSnackBar.open(message, '', {
      duration: 5000,
      panelClass: ['error-snackbar'],
      verticalPosition: 'top'
    });
  }
}

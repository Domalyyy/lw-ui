import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  private messageUrl = environment.baseUrl + '/message';
  private lastUrl = this.messageUrl + '/last';
  private dialogUrl = this.messageUrl + '/dialog';
  private sendUrl = this.messageUrl + '/add';

  constructor(private httpClient: HttpClient) {
  }

  getDialog(userId: number, interlocutorId: number): Observable<any> {
    return this.httpClient.get<any>(this.dialogUrl, {
      params: new HttpParams().set('userId', String(userId)).set('interlocutorId', String(interlocutorId)),
    });
  }

  getMessages(userId: number): Observable<any> {
    return this.httpClient.get<any>(this.lastUrl, {
      params: new HttpParams().set('userId', String(userId)),
    });
  }

  sendMessages(message: any): Observable<any> {
    console.log(message);
    debugger;
    return this.httpClient.post<any>(this.sendUrl, message);
  }
}

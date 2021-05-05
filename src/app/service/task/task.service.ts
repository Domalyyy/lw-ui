import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {Task} from '../../model/task';
import {Answer} from '../../model/answer';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private taskUrl = environment.baseUrl + '/task';
  private submitUrl = this.taskUrl + '/submit';

  constructor(private httpClient: HttpClient) {
  }

  getTasks(programmingLanguage: string, userId: number): Observable<Task[]> {
    return this.httpClient.get<any>(this.taskUrl, {
      params: new HttpParams().set('programmingLanguage', programmingLanguage).set('userId', String(userId)),
    });
  }

  submit(answer: Answer): Observable<any> {
    console.log(answer);
    return this.httpClient.patch<any>(this.submitUrl, answer);
  }
}

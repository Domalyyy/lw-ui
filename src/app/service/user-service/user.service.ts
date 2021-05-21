import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserRegistrationDTO} from '../../model/user-registrationDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registrationUrl = environment.baseUrl + '/signup';
  private tasksCountUrl = environment.baseUrl + '/user/completedTasks';
  private gradationUrl = environment.baseUrl + '/user/gradation';
  private neededCountUrl = environment.baseUrl + '/user/neededCount';

  constructor(private httpClient: HttpClient) {
  }

  save(user: UserRegistrationDTO): any {
    return this.httpClient.post<any>(this.registrationUrl, user);
  }

  getCompletedTasksCountByUserId(userId: number): any {
    return this.httpClient.get<any>(this.tasksCountUrl, {
      params: new HttpParams().set('userId', String(userId))
    });
  }

  getGradationByUserId(userId: number): any {
    return this.httpClient.get<any>(this.gradationUrl, {
      params: new HttpParams().set('userId', String(userId))
    });
  }

  getNeededCountByUserId(userId: number): any {
    return this.httpClient.get<any>(this.neededCountUrl, {
      params: new HttpParams().set('userId', String(userId))
    });
  }
}

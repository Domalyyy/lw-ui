import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserRegistrationDTO} from '../../model/user-registrationDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registrationUrl = environment.baseUrl + '/signup';
  private tasksCountUrl = environment.baseUrl + '/user/completedTasks/count';
  private gradationUrl = environment.baseUrl + '/user/gradation';
  private neededCountUrl = environment.baseUrl + '/user/neededCount';
  private searchUrl = environment.baseUrl + '/user/search';
  private addFriendUrl = environment.baseUrl + '/user/friendRequest/send';
  private cancelFriendUrl = environment.baseUrl + '/user/friendRequest/cancel';
  private friendRequestsUrl = environment.baseUrl + '/user/friendRequest';
  private submitFriendRequestsUrl = environment.baseUrl + '/user/friendRequest/submit';
  private deleteFriendRequestsUrl = environment.baseUrl + '/user/friendRequest/decline';
  private friendsUrl = environment.baseUrl + '/user/friends';
  private deleteFriendUrl = environment.baseUrl + '/user/friend/delete';

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

  getUsersByProgrammingLanguage(programmingLanguage: string, userId: number): any {
    return this.httpClient.get<any>(this.searchUrl, {
      params: new HttpParams().set('programmingLanguage', programmingLanguage).set('userId', String(userId))
    });
  }

  sendFriendRequest(firstUserId: number, secondUserId: number): any {
    return this.httpClient.put<any>(this.addFriendUrl, {}, {
      params: new HttpParams().set('firstUserId', String(firstUserId)).set('secondUserId', String(secondUserId))
    });
  }

  cancelFriendRequest(firstUserId: number, secondUserId: number): any {
    return this.httpClient.put<any>(this.cancelFriendUrl, {}, {
      params: new HttpParams().set('firstUserId', String(firstUserId)).set('secondUserId', String(secondUserId))
    });
  }

  getFriendRequests(userId: number): any {
    return this.httpClient.get<any>(this.friendRequestsUrl, {
      params: new HttpParams().set('userId', String(userId))
    });
  }

  submitFriendRequest(firstUserId: number, secondUserId: number): any {
    return this.httpClient.patch<any>(this.submitFriendRequestsUrl, {}, {
      params: new HttpParams().set('firstUserId', String(firstUserId)).set('secondUserId', String(secondUserId))
    });
  }

  deleteFriendRequests(firstUserId: number, secondUserId: number): any {
    return this.httpClient.delete<any>(this.deleteFriendRequestsUrl, {
      params: new HttpParams().set('firstUserId', String(firstUserId)).set('secondUserId', String(secondUserId))
    });
  }

  getFriends(userId: number): any {
    return this.httpClient.get<any>(this.friendsUrl, {
      params: new HttpParams().set('userId', String(userId))
    });
  }

  deleteFriend(firstUserId: number, secondUserId: number): any {
    return this.httpClient.delete<any>(this.deleteFriendUrl, {
      params: new HttpParams().set('firstUserId', String(firstUserId)).set('secondUserId', String(secondUserId))
    });
  }
}

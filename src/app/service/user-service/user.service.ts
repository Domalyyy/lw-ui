import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UserRegistrationDTO} from '../../model/user-registrationDTO';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private registrationUrl = environment.baseUrl + '/signup';

  constructor(private httpClient: HttpClient) {
  }

  save(user: UserRegistrationDTO): any {
    return this.httpClient.post<any>(this.registrationUrl, user);
  }
}

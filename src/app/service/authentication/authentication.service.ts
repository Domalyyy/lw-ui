import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {User} from '../../model/user';
import {map} from 'rxjs/operators';
import {CookieService} from 'ngx-cookie-service';
import {UserRegistrationDTO} from '../../model/user-registrationDTO';
import {UserService} from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private AUTHENTICATION_URL = environment.baseUrl + '/login';

  private currentUserSubject: BehaviorSubject<User> | undefined;
  public currentUser: Observable<User> | undefined;

  constructor(private http: HttpClient, private cookieService: CookieService, private userService: UserService) {
    const savedUser = this.cookieService.get('currentUser');
    if (savedUser) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(this.cookieService.get('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): any {
    if (this.currentUserSubject) {
      return this.currentUserSubject.value;
    }
  }

  login(username: string, password: string): any {
    return this.http.post<any>(this.AUTHENTICATION_URL, {username, password})
      .pipe(map((user: User) => {
        this.saveSessionUser(user);

        return user;
      }));
  }

  logout(): any {
    this.cookieService.delete('currentUser');
    // @ts-ignore
    this.currentUserSubject?.next(undefined);
  }

  register(userRegistrationDTO: UserRegistrationDTO): any {
    return this.userService.save(userRegistrationDTO)
      .pipe(map((user: User) => {
        this.saveSessionUser(user);

        return user;
      }));
  }

  private saveSessionUser(user: User): void {
    this.cookieService.set('currentUser', JSON.stringify(user));
    if (this.currentUserSubject) {
      this.currentUserSubject.next(user);
    }
  }
}

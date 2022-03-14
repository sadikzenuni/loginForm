import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private userService: UserService) {
    // @ts-ignore
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.api}/login`, {email, password})
      .pipe(map((user: any) => {
        if(user)
        {
          localStorage.setItem('currentUser', JSON.stringify(user.token));
          localStorage.setItem('email', JSON.stringify(email));
          localStorage.setItem('color', JSON.stringify(this.getRandomColor()));
          this.currentUserSubject.next(email);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.removeItem('email');
    localStorage.removeItem('color');
    this.currentUserSubject.next(null);
  }

  getRandomColor() {
    let color = Math.floor(0x1000000 * Math.random()).toString(16);
    return '#' + ('000000' + color).slice(-6);
  }


}

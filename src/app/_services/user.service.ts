import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private API_URL = 'http://localhost:5000/api';
  private userLogin = new BehaviorSubject({});
  public user$ = this.userLogin.asObservable();
  constructor(private readonly http: HttpClient) { }
  public get userValue(): any {
    return this.userLogin.value;
  }
  login(login: any): Observable<any> {
    const url = `${this.API_URL}/users/login`;
    var log = JSON.stringify(login);
    return this.http.post<any>(url, log, httpOptions).pipe(
      map((user) => {
        //debugger;
        localStorage.setItem('user', JSON.stringify(user));
        this.userLogin.next(user);
        return user;
      })
    );
  }
  register(user: any): Observable<number> {
    const url = `${this.API_URL}/users/register`;
    var userString = JSON.stringify(user);
    return this.http.post<any>(url, userString, httpOptions);
  }
  logout() {
    localStorage.removeItem('user');
    this.userLogin.next('');
  }
}

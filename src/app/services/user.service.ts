import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: object;
  apiUrl: string;
  httpOptionsJson: object;
  currentUser: BehaviorSubject<any>;

  constructor(private http: HttpClient, private router: Router) {
    this.apiUrl = environment.API_URL;
    this.httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    this.currentUser = new BehaviorSubject<any>(null);
  }

  register(user) {
    const body = {firstname: user.firstName, lastname: user.lastName, password: user.password, email: user.email};

    return this.http.post(`${this.apiUrl}/register`, body, this.httpOptionsJson);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }

  getUser(token) {
    const observableUser = this.http.post(`${this.apiUrl}/me`, {token});
    observableUser.subscribe( user => {
      this.user = user;
      this.currentUser.next(user);
    });
    return observableUser;
  }


  checkCredentials(loginData) {
    return this.http.post(`${this.apiUrl}/login`, loginData, this.httpOptionsJson );
  }

  finalCheckIn(user) {
    this.getUser(user.data.token);

    localStorage.setItem('token', user.data.token);

    this.router.navigate(['/']);
  }

  isAuthenticated() {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.http.get(`${this.apiUrl}/logout`);
    this.currentUser.next(null);
  }

}

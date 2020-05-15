import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  httpOptionsJson: object;

  constructor(private http: HttpClient, private router: Router) {
    this.httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  getAllSources() {
    return this.http.get(`${environment.NEWS_API_URL}/sources?apiKey=${environment.API_KEY}`);
  }

  getBySource(source, keyword = '') {
    return this.http.get(`${environment.NEWS_API_URL}/top-headlines?sources=${source}&q=${keyword}&apiKey=${environment.API_KEY}`);
  }
}

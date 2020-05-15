import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class BookmarkService {
  apiUrl: string;
  httpOptionsJson: object;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.API_URL;
    this.httpOptionsJson = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
  }

  addBookmark(bookmark) {
    return this.http.post(`${this.apiUrl}/bookmark`, bookmark, this.httpOptionsJson );
  }

  removeBookmark(bookmarkId) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        token: localStorage.getItem('token'),
      },
    };
    return this.http.delete(`${this.apiUrl}/bookmark/${bookmarkId}`, options);
  }
}

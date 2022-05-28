import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private API_URL = 'https://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  GetHome() {
    const url = `${this.API_URL}/client/home`;
    return this.http.get(url);
  }

  GetById(id: any) {
    const url = `${this.API_URL}/client/detail/${id}`;
    return this.http.get(url);
  }

  GetByCategory(id: any, pageSize: any) {
    const url = `${this.API_URL}/client/category/${id}?pageSize=${pageSize}`;
    return this.http.get(url);
  }

  add(category: any): Observable<number> {
    const url = `${this.API_URL}/blogs`;
    var body = JSON.stringify(category);
    return this.http.post<any>(url, body, httpOptions);
  }
}

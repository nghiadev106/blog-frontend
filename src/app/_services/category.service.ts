import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private API_URL = 'https://localhost:5000/api';
  constructor(private readonly http: HttpClient) { }

  GetAll() {
    const url = `${this.API_URL}/blogcategories/all`;
    return this.http.get(url);
  }
}

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
export class VideoService {
  private API_URL = 'https://localhost:5000/api/client';
  constructor(private readonly http: HttpClient) { }

  GetVideo(pageSize: any) {
    const url = `${this.API_URL}/video?pageSize=${pageSize}`;
    return this.http.get(url);
  }

  GetById(id: any) {
    const url = `${this.API_URL}/video/detail/${id}`;
    return this.http.get(url);
  }

}

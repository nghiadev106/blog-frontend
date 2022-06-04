import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};
@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  private API_URL = `https://localhost:5000/api/surveies`;
  constructor(private readonly http: HttpClient) { }
  getAll() {
    const url = `${this.API_URL}`;
    return this.http.get<any>(url);
  }

  checkSurvey(userId: string, surveyID: number): Observable<any> {
    const url = `${this.API_URL}/checkSurvey/${surveyID}/user/${userId}`;
    return this.http.get<any>(url);
  }

  GetSurveyDetail(userId: string, surveyID: number): Observable<any> {
    const url = `${this.API_URL}/getDetail/${surveyID}/user/${userId}`;
    return this.http.get<any>(url);
  }

  getRatioStatistics(surveyID: number): Observable<any> {
    const url = `${this.API_URL}/getRatioStatistics/${surveyID}`;
    return this.http.get<any>(url);
  }

  getUserStatistics(surveyID: number): Observable<any> {
    const url = `${this.API_URL}/getUserStatistics/${surveyID}`;
    return this.http.get<any>(url);
  }

  getById(id: any): Observable<any> {
    const url = `${this.API_URL}/${id}`;
    return this.http.get<any>(url);
  }
}

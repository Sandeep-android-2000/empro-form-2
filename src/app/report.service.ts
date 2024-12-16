import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private apiUrl = 'http://localhost:9090/generateMultipleReports'; // Replace with your backend API URL

  constructor(private http: HttpClient) { }

  generateReports(reportRequest: any): Observable<string> {
    // console.log(this.http.post<string>(this.apiUrl, reportRequest);)
    return this.http.post<string>(this.apiUrl, reportRequest);
  }
}

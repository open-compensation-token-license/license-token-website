import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OEmbedService {
  constructor(private http: HttpClient) {}

  fetchOEmbedData(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}

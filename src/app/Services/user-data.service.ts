import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { API } from './apiConfig';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  baseUrl = API.baseUrl;
  constructor(private http: HttpClient) {}

  getUser(): Observable<any>{
    return this.http.get(`${this.baseUrl}${API.usersEndpoint}`)
  }
}

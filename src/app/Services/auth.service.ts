import { Injectable } from '@angular/core';
import {API} from './apiConfig'
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = API.baseUrl;
  constructor(private http: HttpClient) {}
  
  login(credentials: {email: string , password: string}) : Observable<any>{
    return this.http.post(`${this.baseUrl}${API.auth.login}`, credentials).pipe(
      tap((response: any) => {
          if(response.token)
          {
            localStorage.setItem('authToken', response.token);
          }
      })
    );
  }
  
  register(credentials: {username: string, email: string, gender:string, password:string, role:string}): Observable<any>
  {
    return this.http.post(`${this.baseUrl}${API.auth.register}`, credentials);
  }

  logout(){
    localStorage.removeItem('authToken');
  }
}


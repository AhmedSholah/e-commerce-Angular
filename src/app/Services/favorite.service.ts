import { Injectable } from '@angular/core';
import { API } from './apiConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseUrl = API.baseUrl;
  constructor(private http: HttpClient) {}

  getFavorite(){
    return this.http.get(`${this.baseUrl}${API.auth.register}`);
  }
}

import { Injectable } from '@angular/core';
import { API } from './apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {
  baseUrl = API.baseUrl;
  constructor(private http: HttpClient) {}

  getFavorite(): Observable<any>{
    return this.http.get(`${this.baseUrl}${API.favoritesEndpoint}`);
  }
  addFavorite(productId: string): Observable<any>{
    return this.http.post(`${this.baseUrl}${API.favoritesEndpoint}`, { productId: productId });
  }

  deleteFavorite(productId: string): Observable<any>{
    return this.http.delete(`${this.baseUrl}${API.favoritesEndpoint}/${productId}`);
  }
  
}

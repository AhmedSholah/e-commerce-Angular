import { Injectable } from '@angular/core';
import { API } from './apiConfig';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CatogriesService {

    baseUrl = API.baseUrl;
    constructor(private http: HttpClient) {}

    getCategory(): Observable<any>{
       return this.http.get(`${this.baseUrl}${API.categoriesEndpoint}`);
    }
    
    addCategory(name: string): Observable<any>{
      return this.http.post(`${this.baseUrl}${API.categoriesEndpoint}`, {name : name});
    }

    deleteCategory(name: string): Observable<any>{
      return this.http.delete(`${this.baseUrl}${API.categoriesEndpoint}`,
       { body:{ name: name} });
    }
  
}

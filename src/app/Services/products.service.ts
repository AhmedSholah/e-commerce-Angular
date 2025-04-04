import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from './apiConfig';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  baseUrl = API.baseUrl;
  constructor(private http: HttpClient) { }

  oneProduct(id : string): Observable<any>{
    return this.http.get(`${this.baseUrl}${API.productsEndpoint}/${id}`);
  }

  getProducts(options: { page: number, limit: number, category?: string[], minPrice?: number, maxPrice?: number , inStock?: boolean, sortBy?:'name' | 'price' | 'createdAt', sortOrder?: 'asc' | 'desc'}): Observable<any> {
    let params = new HttpParams()
    .set('page', options.page)
    .set('limit', options.limit);
    
    if( options.category && options.category?.length > 0){
      for(let i = 0; i < options.category.length; i++){
        params = params.append('category', options.category[i]);
      }
    }
    // if(options?.category !== undefined) { params = params.set('category', options.category);}
    if(options?.minPrice !== undefined) {params = params.set('minPrice', options.minPrice);}
    if(options?.maxPrice !== undefined) {params = params.set('maxPrice', options.maxPrice);}
    if(options?.inStock !== undefined){ params = params.set('inStock', options.inStock);}
    if(options?.sortBy !== undefined) {params = params.set('sortBy', options.sortBy);}
    if(options?.sortOrder !== undefined) {params = params.set('sortOrder', options.sortOrder);}
    
    console.log('service option',options);

    return this.http.get(`${this.baseUrl}${API.productsEndpoint}`, { params });
  }


  
}

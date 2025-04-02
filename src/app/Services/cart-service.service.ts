import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from './apiConfig';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class CartServiceService {
    baseUrl = API.baseUrl;
    constructor(private http: HttpClient) {}
    
    private cartVisible = new BehaviorSubject<boolean>(false);
    cartVisible$ = this.cartVisible.asObservable();

    toggleCart() {
        this.cartVisible.next(!this.cartVisible.value);
    }
    getCart(): Observable<any>{
        return this.http.get(`${this.baseUrl}${API.cartEndPoint}`); 
    }
    addToCart(productId: string, quantity: number): Observable<any>{
        return this.http.post(`${this.baseUrl}${API.cartEndPoint}`,{productId: productId, quantity: quantity}); 
    }
    removeFromCart(productId: string): Observable<any>{
        return this.http.delete(`${this.baseUrl}${API.cartEndPoint}/${productId}`); 
    }
}

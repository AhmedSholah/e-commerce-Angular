import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
    
    getCart(){
        
    }

}

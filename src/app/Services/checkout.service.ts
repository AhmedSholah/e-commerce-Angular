import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private apiUrl = 'https://e-commerce-node-js-psi.vercel.app/api/orders';

  constructor(private http: HttpClient) {}

  processPayment(paymentData: any): Observable<any> {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      console.error('No token found! User must be logged in.');
      return new Observable(); 
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` 
    });
    console.log('Sending Payment Data:', paymentData);
    return this.http.post<any>(this.apiUrl, paymentData, { headers });
  }
}

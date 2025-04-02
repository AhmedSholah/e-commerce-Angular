// import { Injectable } from '@angular/core';
// import { API } from './apiConfig';
// import { HttpClient } from '@angular/common/http';
// import { Observable, tap } from 'rxjs';
// @Injectable({
//     providedIn: 'root',
// })
// export class AuthService {
//     baseUrl = API.baseUrl;
//     constructor(private http: HttpClient) {}

//     login(credentials: { email: string; password: string }): Observable<any> {
//         return this.http.post(`${this.baseUrl}${API.auth.login}`, credentials).pipe(
//             tap((response: any) => {
//                 console.log(response.data.token);
//                 if (response.data.token) {
//                     localStorage.setItem('authToken', response.data.token);
//                 }
//             })
//         );
//     }

//     register(credentials: {
//         username: string;
//         email: string;
//         gender: string;
//         password: string;
//         role: string;
//     }): Observable<any> {
//         return this.http.post(`${this.baseUrl}${API.auth.register}`, credentials);
//     }

//     logout() {
//         localStorage.removeItem('authToken');
//     }
// }

// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { API } from './apiConfig';
// import { Observable, tap } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   baseUrl = API.baseUrl;

//   constructor(private http: HttpClient) {}

//   login(credentials: { email: string; password: string }): Observable<any> {
//     return this.http.post(`${this.baseUrl}${API.auth.login}`, credentials).pipe(
//       tap((response: any) => {
//         console.log(response.data.token);
//         if (response.data.token) {
//           localStorage.setItem('authToken', response.data.token);
//         }
//       })
//     );
//   }

//   register(credentials: {
//     username: string;
//     email: string;
//     gender: string;
//     password: string;
//     role: string;
//   }): Observable<any> {
//     return this.http.post(`${this.baseUrl}${API.auth.register}`, credentials);
//   }

//   logout() {
//     localStorage.removeItem('authToken');
//   }
// }


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API } from './apiConfig';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = API.baseUrl;

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}${API.auth.login}`, credentials).pipe(
      tap((response: any) => {
        console.log(response.data.token);
        if (response.data.token) {
          localStorage.setItem('authToken', response.data.token);
        }
      })
    );
  }

  register(credentials: {
    username: string;
    email: string;
    gender: string;
    password: string;
    role: string;
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}${API.auth.register}`, credentials);
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  cancelOrder(orderId: string): Observable<any> {
    const token = localStorage.getItem('authToken'); 
  
    if (!token) {
      console.error('Unauthorized: No token found');
      return new Observable(observer => {
        observer.error({ message: 'Unauthorized: No token found' });
        observer.complete();
      });
    }
  
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json'
    });
  
    return this.http.patch(`https://e-commerce-node-js-psi.vercel.app/api/orders/${orderId}`, { orderStatus: "cancelled" }, { headers });
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserResponse {
    status: string;
    data: {
        currentUser: User;
    };
}

export interface User {
    _id: string;
    firstName?: string;
    lastName?: string;
    email: string;
    phoneNumber?: string;
    country?: string;
    city?: string;
    bio?: string;
    image?: string;
}

@Injectable({
    providedIn: 'root',
})
export class UserDataService {
    private apiUrl = 'https://e-commerce-node-js-psi.vercel.app/api/users';

    constructor(private http: HttpClient) {}

    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(`${this.apiUrl}/me/user`);
    }

    updateUser(userData: Partial<User> | FormData): Observable<{ status: string; data: User }> {
        return this.http.patch<{ status: string; data: User }>(
            `https://e-commerce-node-js-psi.vercel.app/api/users/`,
            userData
        );
    }
}

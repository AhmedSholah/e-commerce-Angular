import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { API } from './apiConfig';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';

export interface CartItem {
    id: string;
    name: string;
    image: string;
    price: number;
    oldPrice: number;
    quantity: number;
}

@Injectable({
    providedIn: 'root',
})
export class CartServiceService {
    baseUrl = API.baseUrl;

    private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
    cartItems$ = this.cartItemsSubject.asObservable();

    private isLoadingSubject = new BehaviorSubject<boolean>(false);
    isLoading$ = this.isLoadingSubject.asObservable();

    private errorMessageSubject = new BehaviorSubject<string>('');
    errorMessage$ = this.errorMessageSubject.asObservable();

    constructor(private http: HttpClient) {}

    private cartVisible = new BehaviorSubject<boolean>(false);
    cartVisible$ = this.cartVisible.asObservable();

    toggleCart() {
        this.cartVisible.next(!this.cartVisible.value);
        if (this.cartVisible.value) {
            this.loadCart();
        }
    }

    setCart(items: any[]) {
        this.cartItemsSubject.next(items);
    }

    getCart() {
        return this.cartItemsSubject.value;
    }

    private setErrorMessage(message: string) {
        this.errorMessageSubject.next(message);
    }

    private getAuthHeaders() {
        const token = localStorage.getItem('authToken');
        return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : null;
    }

    addToCart(productId: string, quantity: number): Observable<any> {
        const headers = this.getAuthHeaders();
        if (!headers) {
            this.setErrorMessage('You need to be logged in to add items to the cart.');
            return new Observable();
        }
        return this.http.post(
            `${this.baseUrl}${API.cartEndPoint}`,
            { productId, quantity },
            { headers }
        );
    }

    loadCart() {
        const headers = this.getAuthHeaders();
        if (!headers) {
            this.setErrorMessage('You need to be logged in to view your cart.');
            this.cartItemsSubject.next([]);
            return;
        }

        this.isLoadingSubject.next(true);
        this.errorMessageSubject.next('');

        this.http
            .get(`${this.baseUrl}${API.cartEndPoint}`, { headers })
            .pipe(
                tap((response: any) => {
                    if (response.status === 'success' && response.data.items) {
                        const items = response.data.items.map((item: any) => ({
                            id: item.product._id,
                            name: item.product.name,
                            price: item.product.priceAfterDiscount || item.product.price,
                            oldPrice: item.product.price,
                            quantity: item.quantity,
                            image:
                                item.product.images.length > 0
                                    ? item.product.images[0]
                                    : 'default-image.png',
                        }));
                        this.cartItemsSubject.next(items);
                    } else {
                        this.setErrorMessage('Failed to load cart items.');
                        this.cartItemsSubject.next([]);
                    }
                }),
                catchError((error) => {
                    this.setErrorMessage('Failed to load cart items.');
                    console.error('Error loading cart:', error);
                    if (error.status === 401) {
                        this.setErrorMessage('Unauthorized: Please log in');
                    }
                    return [];
                }),
                tap(() => this.isLoadingSubject.next(false))
            )
            .subscribe();
    }

    updateQuantity(productId: string, change: number): void {
        const headers = this.getAuthHeaders();
        if (!headers) {
            this.setErrorMessage('You need to be logged in to update items in the cart.');
            return;
        }

        const updatedCart = this.cartItemsSubject.getValue().map((item) => {
            if (item.id === productId) {
                return { ...item, quantity: item.quantity + change };
            }
            return item;
        });

        this.cartItemsSubject.next(updatedCart);

        this.http
            .post(
                `${this.baseUrl}${API.cartEndPoint}`,
                { productId, quantity: change },
                { headers }
            )
            .pipe(
                catchError((error) => {
                    this.setErrorMessage('Failed to update cart item.');
                    console.error('Error updating cart:', error);
                    return [];
                })
            )
            .subscribe();
    }

    removeFromCart(productId: string): Observable<any> {
        const headers = this.getAuthHeaders();
        if (!headers) {
            this.setErrorMessage('You need to be logged in to remove items from the cart.');
            return new Observable();
        }

        return this.http
            .delete(`${this.baseUrl}${API.cartEndPoint}/${productId}`, { headers })
            .pipe(
                tap(() => {
                    const updatedCart = this.cartItemsSubject
                        .getValue()
                        .filter((item) => item.id !== productId);
                    this.cartItemsSubject.next(updatedCart);
                }),
                catchError((error) => {
                    this.setErrorMessage('Failed to remove item from cart.');
                    console.error('Error removing from cart:', error);
                    return [];
                })
            );
    }

    clearCart(): Observable<any> {
        const headers = this.getAuthHeaders();
        if (!headers) {
            this.setErrorMessage('You need to be logged in to clear the cart.');
            return new Observable();
        }

        return this.http.delete(`${this.baseUrl}${API.cartEndPoint}/clear`, { headers }).pipe(
            tap(() => this.cartItemsSubject.next([])),
            catchError((error) => {
                this.setErrorMessage('Failed to clear cart.');
                console.error('Error clearing cart:', error);
                return [];
            })
        );
    }
}

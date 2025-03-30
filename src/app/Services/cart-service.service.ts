import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartServiceService {
  private cartItems = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItems.asObservable();

  private cartVisible = new BehaviorSubject<boolean>(false);
  cartVisible$ = this.cartVisible.asObservable();

  toggleCart() {
    this.cartVisible.next(!this.cartVisible.value);
  }

  setCart(items: any[]) {
    this.cartItems.next(items);
  }

  getCart() {
    return this.cartItems.value;
  }
}

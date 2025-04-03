import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

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
}






  

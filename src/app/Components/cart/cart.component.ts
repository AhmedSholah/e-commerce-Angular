import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../Services/cart-service.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

interface CartItem {
  id: string;
  name: string;
  price: number;
  oldPrice: number;
  quantity: number;
  image: string;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  isCartVisible = false;
  cartItems: CartItem[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(private cartService: CartServiceService,private router: Router) {}

  ngOnInit() {
    this.cartService.cartVisible$.subscribe(visible => {
      this.isCartVisible = visible;
      if (this.isCartVisible) {
        this.cartService.loadCart();
      }
    });

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.isLoading$.subscribe(loading => {
      this.isLoading = loading;
    });

    this.cartService.errorMessage$.subscribe(error => {
      this.errorMessage = error;
    });
  }

  closeCart() {
    this.cartService.toggleCart();
  }

  increaseQuantity(item: CartItem) {
    this.cartService.updateQuantity(item.id, 1);
  }
  
  decreaseQuantity(item: CartItem) {
    if (item.quantity > 1) {
      this.cartService.updateQuantity(item.id, -1);
    }
  }
  


  removeItem(item: CartItem) {
    this.cartService.removeFromCart(item.id).subscribe();
  }

  getTotalPrice(): string {
    return `${this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`;
  }

  clearCart() {
    this.cartService.clearCart().subscribe();
  }
  goToProducts() {
    this.cartService.toggleCart();
    this.router.navigate(['/products']); 
  }
}

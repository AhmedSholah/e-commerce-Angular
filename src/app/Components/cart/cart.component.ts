import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../Services/cart-service.service';

@Component({
    selector: 'app-cart',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
    isCartVisible = false;
    cartItems = [
        {
            name: 'Pure Chakra',
            price: 350.0,
            oldPrice: 400.0,
            quantity: 1,
            image: 'Bag.png',
        },
        {
            name: 'Pure Chakra',
            price: 350.0,
            oldPrice: 400.0,
            quantity: 1,
            image: 'Bag.png',
        },
        {
            name: 'Pure Chakra',
            price: 350.0,
            oldPrice: 400.0,
            quantity: 1,
            image: 'Bag.png',
        },
        {
            name: 'Pure Chakra',
            price: 350.0,
            oldPrice: 400.0,
            quantity: 1,
            image: 'Bag.png',
        },
        {
            name: 'Pure Chakra',
            price: 350.0,
            oldPrice: 400.0,
            quantity: 1,
            image: 'Bag.png',
        },
    ];

    constructor(private cartService: CartServiceService) {}

    ngOnInit() {
        this.cartService.cartVisible$.subscribe((visible) => {
            this.isCartVisible = visible;
        });
    }

    closeCart() {
        this.cartService.toggleCart();
    }

    increaseQuantity(item: any) {
        item.quantity++;
    }

    decreaseQuantity(item: any) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    }

    removeItem(index: number) {
        this.cartItems.splice(index, 1);
    }

    getTotalPrice(): string {
        return `${this.cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}`;
    }
}

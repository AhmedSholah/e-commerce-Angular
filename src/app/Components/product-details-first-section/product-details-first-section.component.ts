import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CommonModule } from '@angular/common';
import { CartServiceService } from '../../Services/cart-service.service';
import { FavoriteService } from '../../Services/favorite.service';

@Component({
    selector: 'app-product-details-first-section',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './product-details-first-section.component.html',
})
export class ProductDetailsFirstSectionComponent implements OnInit {
    productId: string = '';
    product: any = {};
    isLoading: boolean = true;
    errorMessage: string = '';
    quantity: number = 1;

    showSuccess: boolean = false;
    successMessage: string = '';

    constructor(
        private productService: ProductsService,
        private route: ActivatedRoute,
        private router: Router,
        private cartService: CartServiceService,
        private favoriteService: FavoriteService
    ) {}

    ngOnInit(): void {
        this.route.params
            .pipe(
                switchMap((params) => {
                    this.productId = params['id'];
                    return this.productService.oneProduct(this.productId);
                })
            )
            .subscribe(
                (data) => {
                    this.product = data.data.product;
                    this.isLoading = false;
                },
                (error) => {
                    this.errorMessage = 'Failed to load product data';
                    console.error('Error fetching product data:', error);
                    this.isLoading = false;
                }
            );
    }

    increaseQuantity() {
        this.quantity++;
    }

    decreaseQuantity() {
        if (this.quantity > 1) {
            this.quantity--;
        }
    }

    addToCart() {
        this.cartService.addToCart(this.product._id, this.quantity).subscribe({
            next: () => {
                this.cartService.loadCart();
                console.log('Product added to cart successfully');
                this.showToast('Product added to cart successfully');
            },
            error: (err) => {
                console.error('Error adding to cart:', err);
            },
        });
    }

    addToWishlist() {
        this.favoriteService.addFavorite(this.product._id).subscribe({
            next: () => {
                console.log('Product added to wishlist');
                this.showToast('Product added to wishlist');
            },
            error: (err) => {
                console.error('Error adding to wishlist:', err);
            },
        });
    }

    private showToast(message: string) {
        this.successMessage = message;
        this.showSuccess = true;
        setTimeout(() => {
            this.showSuccess = false;
        }, 3000);
    }

    goBack() {
        this.router.navigate(['/products']);
    }
}

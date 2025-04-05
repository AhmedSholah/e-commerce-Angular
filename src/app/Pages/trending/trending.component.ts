import { ProductsService } from './../../Services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FavoriteService } from '../../Services/favorite.service';
import { CatogriesService } from '../../Services/catogries.service';
import { Products } from '../products/product_interface';
import { CartServiceService } from '../../Services/cart-service.service';

@Component({
    selector: 'app-trending',
    imports: [CommonModule, RouterModule],
    templateUrl: './trending.component.html',
})
export class TrendingComponent implements OnInit {
  cards: Products[] = [];
  favoriteCards: string[] = [];
  addedItems: string[] = [];
  loading: boolean = true;

  constructor(
    private productsService: ProductsService,
    private favoriteService: FavoriteService,
    private cartService: CartServiceService
  ) {}

  ngOnInit() {
    this.fetchTrendingProducts();
    this.fetchFavorites();
  }

  fetchTrendingProducts() {
    this.productsService.getProducts({ page: 3, limit: 6 }).subscribe({
      next: (res: any) => {
        this.cards = res.data.products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching trending products:', err);
        this.loading = false;
      }
    });
  }

  fetchFavorites() {
    this.favoriteService.getFavorite().subscribe({
      next: (res: any) => {
        this.favoriteCards = res.data.items.map((item: any) => item.product?._id).filter(Boolean);
      },
      error: (err) => console.error('Error fetching favorites:', err)
    });
  }

  addFavorite(productId: string) {
    if (this.favoriteCards.includes(productId)) {
      this.favoriteService.deleteFavorite(productId).subscribe({
        next: () => {
          this.favoriteCards = this.favoriteCards.filter(id => id !== productId);
        },
        error: (err) => console.error('Error removing favorite:', err)
      });
    } else {
      this.favoriteService.addFavorite(productId).subscribe({
        next: () => {
          this.favoriteCards.push(productId);
        },
        error: (err) => console.error('Error adding favorite:', err)
      });
    }
  }

  addToCart(productId: string) {
    this.cartService.addToCart(productId, 1).subscribe({
      next: () => {
        this.addedItems.push(productId);
        setTimeout(() => {
          this.addedItems = this.addedItems.filter(id => id !== productId);
        }, 2000);
      },
      error: (err) => console.error('Error adding to cart:', err)
    });
  }
}

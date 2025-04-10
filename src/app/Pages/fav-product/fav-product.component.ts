import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OurReviewsComponent } from '../../Components/our-reviews/our-reviews.component';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { CartComponent } from '../../Components/cart/cart.component';
import { ProductsService } from '../../Services/products.service';
import { CatogriesService } from '../../Services/catogries.service';
import { CartServiceService } from '../../Services/cart-service.service';
import { FavoriteService } from '../../Services/favorite.service';
import { category, Products } from '../products/product_interface';
import { SkelatonProductCardsComponent } from '../../Components/skelaton-product-cards/skelaton-product-cards.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fav-product',
  imports: [CommonModule,HeaderComponent, OurReviewsComponent,FooterComponent,CartComponent,SkelatonProductCardsComponent],
  templateUrl: './fav-product.component.html',
  styles: ``
})



export class FavProductComponent {

  constructor(private product: ProductsService, private categoryService: CatogriesService, private cartServiceService: CartServiceService
    ,private favoriteService: FavoriteService, private router: Router
  ){
  }

  cardsNumber: number = 4;
  cardsOrder = 'Z-A';
  sortBy: 'name' | 'price' | 'createdAt'= 'name';
  sortOrder: 'asc' | 'desc' = 'asc';
  displayP='hidden'; 
  displaySort= 'hidden';
  paginationNumber = 4;
  heart = 'images/trending/heart.svg';
  filter = false;
  cards: Products[] = [];
  categories: category[] = [];
  filteredOptions: string[] = [];
  instock: boolean = true;
  minPrice: number | undefined = undefined;
  maxPrice: number | undefined = undefined;
  perPage: number = 4;
  page: number  = 1; 
  bestSelling:  Products[] = [];
  productCount: number = 0;
  highestPrice: number = 0;
  // totalPages: number = this.getTotalPages();
  loading: boolean = true;
  errorPriceValidation: boolean = false;
  errMessage: string = 'no Errors';
  emptyState: boolean = false;
  imageUrl = 'https://saratogasnowmobile.com/wp-content/uploads/woocommerce-placeholder.png';
  bestSellingCard: number = 0; 
  ind1 = 0; 
  ind2 = 1; 
  addedItems: string[] = [];
  favoriteCards: string[] = [];

  toggleHeart(index: number){
    // this.cards[index].loved = !this.cards[index].loved; 
  }



  
async addToCart(productId: string){
  
  console.log(productId);
  await this.cartServiceService.addToCart(productId , 1).subscribe({
    next: (res) =>{
      console.log(res);
    },
    error: (err) =>{
      console.log(err);
    }
  });
  this.addedItems.push(productId);
  console.log(this.addedItems);

  let intervalId = setInterval(()=>{
    this.addedItems.pop();
    console.log(this.addedItems);
    clearInterval(intervalId);
  },2000);

}
 
cardsFavorite: Products[]= [];
fetchFavorite() {
  this.loading = true; 
  this.favoriteService.getFavorite().subscribe({
    next: (res: any) => {
      this.favoriteCards = [];
      this.cards = [];
      res.data.items.forEach((item: any) => {
        if (item.product) {  
          this.favoriteCards.push(item.product._id);
          this.cards.push(item.product); 
        }
      });
      this.loading = false;
      this.emptyState = this.cards.length === 0;
      console.log("Favorite Cards:", this.cards);
    },
    error: (err) => {
      this.loading = false;
      this.emptyState = true;
      console.log(err);
    }
  });
}

removeFavorite(productId : string){
  this.favoriteService.deleteFavorite(productId).subscribe({
    next: (res) => {
      this.favoriteCards = this.favoriteCards.filter((id) => id !== productId);
      this.fetchFavorite();

      console.log("card Deletes", res);
    },
    error : (err) => {
      console.log(err);
    }
  });
}

navigateToProductDetails(ProductID : string){
  this.router.navigate([`/product/${ProductID}`]);
}

navigateToProducts(){
  this.router.navigate(['/products']);
}
  ngOnInit(){
    
    this.fetchFavorite();
  }
}
  

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { OurReviewsComponent } from '../../Components/our-reviews/our-reviews.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { ProductsService } from '../../Services/products.service';
import {Products} from './product_interface'
@Component({
  selector: 'app-products',
  imports: [CommonModule, HeaderComponent, OurReviewsComponent,FooterComponent],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {

  constructor(private product: ProductsService){

  }

  cardsNumber: number = 4;
  cardsOrder = 'Z-A';
  displayP='hidden'; 
  displaySort= 'hidden';
  paginationNumber = 4;
  heart = 'images/trending/heart.svg';
  filter = false;
   cards: Products[] = [];


  // toggleHeart(index: number){
  //   this.cards[index].loved = !this.cards[index].loved; 
  // }
  
  cardPagination(cardsNumber : number){
    this.displayP = this.displayP === 'hidden' ? 'block' : 'hidden';
    this.cardsNumber = cardsNumber;
    this.paginationNumber = cardsNumber;
  }
  sortCards(order:string){
    this.displaySort = this.displaySort === 'hidden' ? 'block' : 'hidden';
    this.cardsOrder = order;
  }

  fetchOneProduct(id: string) {
    this.product.oneProduct(id).subscribe({
      next: (res:any) => {
        const oneProduct = res.data.product;
        console.log(res);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }  

  toggleFilter(){
    this.filter = !this.filter;
    console.log(this.filter);
  }
  
  fetchProducts(options: { page: number, limit: number, category?: string, minPrice?: number, maxPrice?: number , inStock?: boolean, sortBy?:'name' | 'price' | 'createdAt', sortOrder?: 'asc' | 'desc'}) {
   console.log('optionProduct',options);
    this.product.getProducts(options).subscribe({
      next: (res:any) => {
        const Products = res.data.products;
        this.cards = Products;
        
        console.log(this.cards);
        
      },
      error: (error) => {
        console.log(error);
      }
    });
}

  ngOnInit(){
    // this.fetchOneProduct("67d4446da328b72e7b649725");
    this.fetchProducts({page: 1, limit: 16});
  }
}


// handle the product request done

// handel  responsive
  // handel the filter
    // make it absloute on the small screens
    


// filter options 
  // category -- get the value pass it to Catigorie api 
  // get the id of the selected pass is to the api product object 
  // update the card array 
// pagination button 


// handel sortFunction
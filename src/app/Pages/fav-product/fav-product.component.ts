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

@Component({
  selector: 'app-fav-product',
  imports: [CommonModule,HeaderComponent, OurReviewsComponent,FooterComponent,CartComponent,SkelatonProductCardsComponent],
  templateUrl: './fav-product.component.html',
  styles: ``
})



export class FavProductComponent {

  constructor(private product: ProductsService, private categoryService: CatogriesService, private cartServiceService: CartServiceService
    ,private favoriteService: FavoriteService
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

  toggleHeart(index: number){
    // this.cards[index].loved = !this.cards[index].loved; 
  }
  
  // cardPagination(cardsNumber : number){
  //   this.displayP = this.displayP === 'hidden' ? 'block' : 'hidden';
  //   this.cardsNumber = cardsNumber;
  //   this.paginationNumber = cardsNumber;
  //   this.perPage = cardsNumber;
  //   this.loadProducts();
  // }
  // showSortList(){
  //   this.displaySort = this.displaySort === 'hidden' ? 'block' : 'hidden';
  // }
  // sortCards(order:string){
  //   this.displaySort = this.displaySort === 'hidden' ? 'block' : 'hidden';
  //   this.cardsOrder = order;
  //   if(order === 'Z-A') this.sortOrder = 'desc';
  //   else if(order === 'Low to high'){
  //     this.sortBy = 'price';
  //     this.sortOrder = 'asc';
  //   }
  //   else if(order === 'High to low'){
  //     this.sortBy = 'price';
  //     this.sortOrder = 'desc';
  //   }
  //   else if(order === 'Old to new'){
  //     this.sortBy = 'createdAt';
  //     this.sortOrder = 'asc';
  //   } else if(order === 'New to old'){
  //     this.sortBy = 'createdAt';
  //     this.sortOrder = 'desc';
  //   }
  //   this.page = 1;
  //   this.loadProducts();
  // }


  
  // stockStatus(event: any){
  //   this.instock = event.target.value;
  // }

  changePage(number: number){
    // this.totalPages = this.getTotalPages();
    
    // // Check if we can go to the next page
    // if(number === 1 && this.page < this.totalPages){
    //   this.page += number; 
    //   this.loadProducts();
    // } 
    // else if(number === -1 && this.page > 1){
    //   this.page += number;
    //   this.loadProducts();
    // }
  }

  
  // validatePriceInput()
  // {   
    
  //   if(this.minPrice && !this.maxPrice )
  //   return  {valid: true, message: 'Max Price is Required'}; 
  //   else if(this.maxPrice && !this.minPrice)
  //   return  {valid: true, message: 'Min Price is Required'}; 
  //   else if(this.maxPrice && this.maxPrice > this.highestPrice)
  //     return  {valid: true, message: `Max Price Should be less then ${this.highestPrice}`}; 
  //   else if((this.minPrice && this.maxPrice) && this.maxPrice < this.minPrice)
  //     return  {valid: true, message: `Min Price Should be less then Max Price $${this.highestPrice}`};
  //   else if((this.minPrice && this.maxPrice) && this.maxPrice < this.minPrice)
  //     return  {valid: true, message: `Max Price Should be Greater then Min Price $${this.highestPrice}`};

  //   return { valid: false , message : ''};
  // }

  // getTotalPages(): number {
  //   return Math.ceil(this.productCount / this.perPage);
  // }

  // clearAll(){
  //   this.filteredOptions = [];
  //   this.instock = true;
  //   this.minPrice = 0;
  //   this.maxPrice = 0;
  //   this.errorPriceValidation = false;
  //   this.emptyState = false;

  //   const checkBoxInputs = document.querySelectorAll("input[type='checkbox']");
  //   const radioInputs = document.querySelectorAll("input[type='radio']");

  //   checkBoxInputs.forEach((element) => {
  //     if((element as HTMLInputElement).checked === true)
  //     {
  //       (element as HTMLInputElement).checked = false;
  //     }
  //   });

  //   radioInputs.forEach((element) => {
  //     if((element as HTMLInputElement).checked === true)
  //     {
  //       (element as HTMLInputElement).checked = false;
  //     }
  //   });
  //   this.loadProducts();   
  // }

  // FilterOptions(event : any){
  //   const value = event.target.value; 
  //   this.categories.forEach((category) => {
  //     if(category.name === value){ 
  //       const id_category = category._id; 
  //       const ID = this.filteredOptions.find((id_category) => {return id_category == category._id}); 
  //       if(!ID)
  //       {
  //         this.filteredOptions.push(category._id); ;
  //       }
  //       else
  //       {
  //         this.filteredOptions = this.filteredOptions.filter((id) => 
  //         {
  //           return id !== ID;
  //         })
  //       }
  //     }
  //   });
  // }

  // fetchCategories(){
  //   this.categoryService.getCategory().subscribe(
  //  { 
  //   next: (res: any) => {
  //     this.categories = res.data.categories; 

  //   },
  //   error: (err) => {
  //     console.log(err);
  //   }});    
  // }
  // checkAvilabiltyState(event: any){
  // }

//   fetchProducts(options: { page: number, limit: number, category?: string[], minPrice?: number, maxPrice?: number , inStock?: boolean, sortBy?:'name' | 'price' | 'createdAt', sortOrder?: 'asc' | 'desc'}) {
//     this.product.getProducts(options).subscribe({
//       next: (res:any) => {
//         this.loading = false;
//         const Products = res.data.products;
//         this.cards = Products;
//         if(this.cards.length === 0) {
//           this.emptyState = true;
//           console.log('display empty');
//         }
//         console.log(this.cards);
//         this.bestSelling = res.data.bestSellingProducts;
//         console.log("Here is best Selling",this.bestSelling);
//         this.highestPrice = res.data.highestPricedProduct.price;
//         this.productCount = res.data.productsCount;
//       },
//       error: (error) => {
//         console.log(error);
//         window.alert('Reload the Page error While Loading');
//       }
//     });
// }


// changeBestSellingCard(number : number){
//  const bestSellingLength = this.bestSelling.length;
  
//  if(number == 1 && this.ind2 < bestSellingLength){
//   this.ind1++;
//   this.ind2++;
//  }else if (number == -1 && this.ind1 > 0){
//   this.ind1--;
//   this.ind2--;
//  }
//   console.log(this.ind1,this.ind2);
// }


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
 
// loadProducts(){
//   this.fetchProducts({page: this.page,  limit: this.perPage, category: this.filteredOptions, inStock: this.instock, minPrice: this.minPrice, maxPrice: this.maxPrice , sortBy: this.sortBy ,sortOrder: this.sortOrder});
//   this.totalPages = this.getTotalPages();
// }

favoriteCards: string[] = [];
cardsFavorite: Products[]= [];
fetchFavorite(){
  this.favoriteService.getFavorite().subscribe({
    next: (res: any) => {
      this.favoriteCards = [];
      res.data.items.forEach((item: any) => {
        if (item.product) {  
          this.favoriteCards.push(item.product._id);
          this.cards.push(item);
        }
      });
      console.log("Favorite Cards IDs**********************:", this.cardsFavorite);
    },
    error: (err) => {
      console.log(err);
    }
  });
}


addFavorite(productId: string){
  const flag = this.favoriteCards.includes(productId);
  if(!flag){
    this.favoriteService.addFavorite(productId).subscribe({
      next: (res) => {
        this.favoriteCards.push(productId);
        console.log("favorite Card Added", this.favoriteCards);
      },
      error : (err) => {
        console.log(err);
      }
    });
  }
  else{
    this.favoriteCards = this.favoriteCards.filter((id) => id !== productId);
    this.removeFavorite(productId);
    console.log("favorite Card Deleted", this.favoriteCards);
  }
}

removeFavorite(productId : string){
  this.favoriteService.deleteFavorite(productId).subscribe({
    next: (res) => {
      console.log("card Deletes", res);
    },
    error : (err) => {
      console.log(err);
    }
  });
}
// if button clicked get id 




  ngOnInit(){
    // this.loadProducts();
    // this.fetchCategories();
    this.fetchFavorite();
  }
}
  

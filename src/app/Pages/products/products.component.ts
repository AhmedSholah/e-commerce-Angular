import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { OurReviewsComponent } from '../../Components/our-reviews/our-reviews.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { ProductsService } from '../../Services/products.service';
import {category, Products} from './product_interface'
import { CatogriesService } from '../../Services/catogries.service';
import { FormsModule } from '@angular/forms';
import { SkelatonProductCardsComponent } from '../../Components/skelaton-product-cards/skelaton-product-cards.component';
@Component({
  selector: 'app-products',
  imports: [CommonModule, HeaderComponent, OurReviewsComponent,FooterComponent, FormsModule, SkelatonProductCardsComponent],
  templateUrl: './products.component.html',
  styles: ``
})
export class ProductsComponent {

  constructor(private product: ProductsService, private categoryService: CatogriesService){
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
  totalPages: number = this.getTotalPages();
  loading: boolean = true;
  errorPriceValidation: boolean = false;
  // toggleHeart(index: number){
  //   this.cards[index].loved = !this.cards[index].loved; 
  // }
  
  cardPagination(cardsNumber : number){
    this.displayP = this.displayP === 'hidden' ? 'block' : 'hidden';
    this.cardsNumber = cardsNumber;
    this.paginationNumber = cardsNumber;
    this.perPage = cardsNumber;
    // if(this.page == this.totalPages){
    //   this.totalPages = this.getTotalPages();
    //   this.page = this.totalPages;
    // }
    this.loadProducts();
  }
  showSortList(){
    this.displaySort = this.displaySort === 'hidden' ? 'block' : 'hidden';
  }
  sortCards(order:string){
    this.displaySort = this.displaySort === 'hidden' ? 'block' : 'hidden';
    this.cardsOrder = order;
    if(order === 'Z-A') this.sortOrder = 'desc';
    else if(order === 'Low to high'){
      this.sortBy = 'price';
      this.sortOrder = 'asc';
    }
    else if(order === 'High to low'){
      this.sortBy = 'price';
      this.sortOrder = 'desc';
    }
    else if(order === 'Old to new'){
      this.sortBy = 'createdAt';
      this.sortOrder = 'asc';
    } else if(order === 'New to old'){
      this.sortBy = 'createdAt';
      this.sortOrder = 'desc';
    }
    this.page = 1;
    this.loadProducts();
  }

  fetchOneProduct(id: string) {
    this.product.oneProduct(id).subscribe({
      next: (res:any) => {
        const oneProduct = res.data.product;
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
  
  stockStatus(event: any){
    this.instock = event.target.value;
  }

  changePage(number: number){
    // Use the helper method to get total pages
    this.totalPages = this.getTotalPages();
    
    // Check if we can go to the next page
    if(number === 1 && this.page < this.totalPages){
      this.page += number; 
      this.loadProducts();
    } 
    // Check if we can go to the previous page
    else if(number === -1 && this.page > 1){
      this.page += number;
      this.loadProducts();
    }
  }

  
  applyChange(){
   
    if((!this.minPrice && this.minPrice != undefined || !this.maxPrice && this.maxPrice != undefined )){
      this.errorPriceValidation = true;
    }
  
    console.log(this.errorPriceValidation );
    this.loading = true;
    this.page = 1;
    this.loadProducts();
  }

  getTotalPages(): number {
    return Math.ceil(this.productCount / this.perPage);
  }

  clearAll(){
    this.filteredOptions = [];
    this.instock = true;
    this.minPrice = 0;
    this.maxPrice = 0;
    const checkBoxInputs = document.querySelectorAll("input[type='checkbox']");
    const radioInputs = document.querySelectorAll("input[type='radio']");

    checkBoxInputs.forEach((element) => {
      if((element as HTMLInputElement).checked === true)
      {
        (element as HTMLInputElement).checked = false;
      }
    });

    radioInputs.forEach((element) => {
      if((element as HTMLInputElement).checked === true)
      {
        (element as HTMLInputElement).checked = false;
      }
    });
    this.loadProducts();   
  }

  FilterOptions(event : any){
    const value = event.target.value; 
    this.categories.forEach((category) => {
      if(category.name === value){ 
        const id_category = category._id; 
        const ID = this.filteredOptions.find((id_category) => {return id_category == category._id}); 
        if(!ID)
        {
          this.filteredOptions.push(category._id); ;
        }
        else
        {
          this.filteredOptions = this.filteredOptions.filter((id) => 
          {
            return id !== ID;
          })
        }
      }
    });
  }

  fetchCategories(){
    this.categoryService.getCategory().subscribe(
   { 
    next: (res: any) => {
      this.categories = res.data.categories; 

    },
    error: (err) => {
      console.log(err);
    }});    
  }
  checkAvilabiltyState(event: any){

  }
  fetchProducts(options: { page: number, limit: number, category?: string[], minPrice?: number, maxPrice?: number , inStock?: boolean, sortBy?:'name' | 'price' | 'createdAt', sortOrder?: 'asc' | 'desc'}) {
    this.product.getProducts(options).subscribe({
      next: (res:any) => {
        this.loading = false;
        const Products = res.data.products;
        this.cards = Products;
        console.log(this.cards);
        this.bestSelling = res.data.bestSellingProducts;
        this.highestPrice = res.data.highestPricedProduct.price;
        this.productCount = res.data.productsCount;
        // console.log(this.bestSelling);
      },
      error: (error) => {
        console.log(error);
      }
    });
}
 
loadProducts(){
  this.fetchProducts({page: this.page,  limit: this.perPage, category: this.filteredOptions, inStock: this.instock, minPrice: this.minPrice, maxPrice: this.maxPrice , sortBy: this.sortBy ,sortOrder: this.sortOrder});
  this.totalPages = this.getTotalPages();
}

  ngOnInit(){
    // this.fetchOneProduct("67d4446da328b72e7b649725");
    this.loadProducts();
    this.fetchCategories();
    
  }
}
  

// ClearAll function --> Done 
// handel sort button --> Done
// set limit for the pagination --> Done


// make a skelton for the product 
// validate price inputs

// handel best selling card --> best selling
// handel if there is no product 

// handel love 
// handel filter on the mobile 
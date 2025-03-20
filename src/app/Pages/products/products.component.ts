import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { OurReviewsComponent } from '../../Components/our-reviews/our-reviews.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { ProductsService } from '../../Services/products.service';

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

   cards = [
    {
      title: 'Generic',
      price: '$350',
      description: 'Straw Woven Tote Bag, Handmade Large Straw Tote Bag, Perfect for Shopping and Holidays. Made with eco-friendly materials, durable and stylish. Ideal for beach days, picnics, and casual outings. Lightweight and spacious to carry all essentials.',
      image: 'images/trending/1.svg',
      loved: true,
      rating: 5
    },
    {
      title: 'Pure Chakra',
      price: '$250',
      description: 'Cotton Macrame Purse Bag, Hand-Woven Knitted Crossbody with intricate patterns. Soft and durable cotton fabric with a boho-chic vibe. Versatile for casual and festival wear. Comes with a secure zipper and adjustable strap for comfort.',
      image: 'images/trending/2.svg',
      loved: false,
      rating: 3
    },
    {
      title: 'Preppy Bracelet',
      price: '$360',
      description: 'Crossbody Bag Purse, Handmade Hobo Bag Satchel designed for modern women. Sleek design with multiple compartments for organized storage. Crafted from high-quality materials with an adjustable strap for comfort and style.',
      image: 'images/trending/3.svg',
      loved: true,
      rating: 3
    },
    {
      title: 'Summer Tote',
      price: '$300',
      description: 'Handmade Summer Tote Bag, Woven Straw with colorful patterns. Spacious and lightweight, perfect for beach vacations, picnics, and casual outings. Durable handles for easy carrying and secure closure to protect belongings.',
      image: 'images/trending/4.svg',
      loved: false,
      rating: 4
    },
    {
      title: 'Boho Bag',
      price: '$275',
      description: 'Boho Chic Straw Bag, Handmade with intricate knitting patterns. Stylish and functional with a relaxed bohemian vibe. Perfect for festivals, beach days, or everyday use. Spacious enough to hold all your essentials comfortably.',
      image: 'images/trending/5.svg',
      loved: true,
      rating: 5
    },
    {
      title: 'Vintage Purse',
      price: '$320',
      description: 'Vintage Style Purse Bag, Straw Knit, Holiday Bag with a timeless design. Inspired by classic styles with modern functionality. Spacious compartments for organized storage. Perfect for casual outings and vacation trips.',
      image: 'images/trending/6.svg',
      loved: false,
      rating: 3
    },
    {
      title: 'Elegant Clutch',
      price: '$280',
      description: 'Handcrafted Elegant Clutch, made with natural straw fibers. Features a sleek, minimalist design perfect for evening wear and special occasions. Compact yet spacious enough for essentials. Comes with a detachable strap.',
      image: 'images/trending/3.svg',
      loved: true,
      rating: 4
    },
    {
      title: 'Rustic Handbag',
      price: '$310',
      description: 'Rustic Woven Handbag, beautifully crafted for everyday use. Combines durability with style, featuring a secure magnetic closure and reinforced handles. Ideal for both casual and semi-formal outings.',
      image: 'images/trending/2.svg',
      loved: false,
      rating: 4
    }
];

  


  toggleHeart(index: number){
    this.cards[index].loved = !this.cards[index].loved; 
  }
  
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
  
  fetchProducts(options: { page: number, limit: number, category?: string, minPrice?: number, maxPrice?: number , inStock?: boolean, sortBy?:'name' | 'price' | 'createdAt', sortOrder?: 'asc' | 'desc'}) {
   console.log('optionProduct',options);
    this.product.getProducts(options).subscribe({
      next: (res:any) => {
        const Products = res.data.products;
        console.log(Products);
      },
      error: (error) => {
        console.log(error);
      }
    });
}

  ngOnInit(){
    // this.fetchOneProduct("67d4446da328b72e7b649725");
    this.fetchProducts({page: 1, limit: 4 , sortOrder: 'asc'});
  }
}

import { ProductsService } from './../../Services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-trending',
    imports: [CommonModule, RouterModule],
    templateUrl: './trending.component.html',
})
export class TrendingComponent {
    cards: any = [];

    constructor(private productsService: ProductsService) {}

    ngOnInit() {
        this.productsService.getProducts({ page: 1, limit: 6 }).subscribe({
            next: (res) => {
                console.log(res.data.products);
                this.cards = res.data.products;
            },
            error: (res) => {
                console.log(res);
            },
        });
    }

    heart = 'images/trending/heart.svg';

    // toggleHeart(index: number) {
    //     this.cards[index].loved = !this.cards[index].loved;
    // }
}

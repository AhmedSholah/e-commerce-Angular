import { Component } from '@angular/core';
import { FirstSectionComponent } from '../../Components/first-section/first-section.component';
import { SecondSectionComponent } from '../../Components/second-section/second-section.component';
import { OurReviewsComponent } from '../../Components/our-reviews/our-reviews.component';
import { AboutUsComponent } from '../../Components/about-us/about-us.component';
import { TopCategoriesComponent } from '../../Components/top-categories/top-categories.component';
import { TrendingComponent } from '../trending/trending.component';
import { CartComponent } from '../../Components/cart/cart.component';

@Component({
    selector: 'app-home',
    imports: [
        FirstSectionComponent,
        SecondSectionComponent,
        AboutUsComponent,
        TopCategoriesComponent,
        TrendingComponent,
        OurReviewsComponent,
        CartComponent,
    ],

    templateUrl: './home.component.html',
})
export class HomeComponent {}

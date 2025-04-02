import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { ProductDetailsFirstSectionComponent } from '../../Components/product-details-first-section/product-details-first-section.component';
import { ProductFirstSectionComponent } from '../../Components/product-first-section/product-first-section.component';
import { ProductdetailsSecondSectionComponent } from '../../Components/productdetails-second-section/productdetails-second-section.component';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        HeaderComponent,
        ProductDetailsFirstSectionComponent,
        ProductdetailsSecondSectionComponent,
    ],
    templateUrl: './product-details.component.html',
    // styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {}

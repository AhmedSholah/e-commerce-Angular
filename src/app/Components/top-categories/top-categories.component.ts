import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CategoryCardComponent } from '../category-card/category-card.component';
import { CatogriesService } from '../../Services/catogries.service';
import { LoaderComponent } from '../loader/loader.component';

interface Categories {
    name: string;
    imageUrl: string;
}

@Component({
    selector: 'app-top-categories',
    imports: [CommonModule, CategoryCardComponent, LoaderComponent],
    templateUrl: './top-categories.component.html',
})
export class TopCategoriesComponent {
    loading: boolean = true;
    categories: Categories[] = [];

    constructor(private catogriesService: CatogriesService) {}

    ngOnInit() {
        this.catogriesService.getCategory().subscribe({
            next: (res) => {
                this.categories = res.data.categories;
                this.loading = false;
            },
            error: (err) => {
                console.log(err);
                this.loading = false;
            },
        });
    }
}

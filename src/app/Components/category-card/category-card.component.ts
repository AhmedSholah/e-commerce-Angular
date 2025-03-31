import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-category-card',
    templateUrl: './category-card.component.html',
})
export class CategoryCardComponent {
    @Input() category!: { name: string; image: string };
}

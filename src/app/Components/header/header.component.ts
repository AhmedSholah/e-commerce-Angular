import { Component } from '@angular/core';
import { CartServiceService } from '../../Services/cart-service.service';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [RouterModule],
    templateUrl: './header.component.html',
})
export class HeaderComponent {
    constructor(private cartService: CartServiceService) {}

    toggleCart(event: Event) {
        event.preventDefault();
        this.cartService.toggleCart();
    }
}

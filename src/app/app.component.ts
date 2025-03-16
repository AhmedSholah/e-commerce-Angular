import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule, HomeComponent, HeaderComponent, HttpClientModule],
    templateUrl: './app.component.html',
    // styleUrl: './app.component.css'
})
export class AppComponent {}

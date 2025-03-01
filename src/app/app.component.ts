import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { HeaderComponent } from './Components/header/header.component';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterModule,HomeComponent,HeaderComponent],
    templateUrl: './app.component.html',
    // styleUrl: './app.component.css'
})
export class AppComponent {}

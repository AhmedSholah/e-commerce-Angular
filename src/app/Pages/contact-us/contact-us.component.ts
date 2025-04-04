import { Component } from '@angular/core';
import { HeaderComponent } from '../../Components/header/header.component';
import { FooterComponent } from '../../Components/footer/footer.component';
import { FormGroup } from '@angular/forms';
import { CartComponent } from '../../Components/cart/cart.component';

@Component({
  selector: 'app-contact-us',
  imports: [HeaderComponent, FooterComponent,CartComponent],
  templateUrl: './contact-us.component.html',
  styles: ``
})
export class ContactUsComponent {

  
}

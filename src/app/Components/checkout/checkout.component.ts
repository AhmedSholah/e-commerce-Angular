import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../Services/checkout.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartServiceService } from '../../Services/cart-service.service';

@Component({
  standalone: true,
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './checkout.component.html',
})
export class CheckoutComponent {
  paymentMethod: string = 'visa';
  shippingForm: FormGroup;
  loading: boolean = false;
  cartItems: any[] = [];

  formSubmitted:boolean = false;

  constructor(
    private fb: FormBuilder,
    private checkoutService: CheckoutService,
    private router: Router,
    private cartService: CartServiceService
  ) {
    this.shippingForm = this.fb.group({
      city: ['', Validators.required],
      streetaddress: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s,.\-\/]+$/)]],
      streetnumber: ['', [Validators.required, Validators.pattern(/^\d{1,5}$/)]],
      apartment: ['', [Validators.required, Validators.pattern(/^\d{1,4}$/)]],
      phone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
    });
  }

//   ngOnInit() {
//     this.cartService.cartItems$.subscribe((items) => {
//       this.cartItems = [...items];
//       console.log('Cart Items in Checkout:', this.cartItems);
//     });
//   }
ngOnInit() {
  const storedCart = localStorage.getItem('cartItems');
  if (storedCart) {
    this.cartItems = JSON.parse(storedCart);
  } else {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = [...items];
    });
  }
}

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get vat(): number {
    let vat = this.subtotal * 0.14;
    return Number(vat.toFixed(2));
  }

  get shipping(): number {
    return this.cartItems.length > 0 ? 10 : 0;
  }

  get total(): number {
    const total = this.subtotal + this.vat + this.shipping;
    return Number(total.toFixed(2)) ;
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }
  
decreaseQuantity(index: number) {
  const item = this.cartItems[index];

  if (item.quantity > 1) {
    item.quantity--;
    this.cartService.updateQuantity(item.id, -1);
  } else {
    this.removeItem(index);
    this.cartService.removeFromCart(item.id).subscribe(); 
  }
}

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }

  selectPayment(method: string) {
    this.paymentMethod = method;
  }

  get city() {
    return this.shippingForm.get('city');
  }

  get streetaddress() {
    return this.shippingForm.get('streetaddress');
  }

  get streetnumber() {
    return this.shippingForm.get('streetnumber');
  }

  get apartment() {
    return this.shippingForm.get('apartment');
  }

  get phone() {
    return this.shippingForm.get('phone');
  }

  onSubmit() {
    this.formSubmitted = true; 
    this.shippingForm.markAllAsTouched(); 

    if (this.shippingForm.invalid) {
      console.log('Form is not valid');
      return;
    }

    this.loading = true;

    const paymentData = {
      ...this.shippingForm.value,
      paymentMethod: this.paymentMethod,
      cartItems: this.cartItems,
      total: this.total,
    };

    console.log('Payment Data:', paymentData);

    this.checkoutService.processPayment(paymentData).subscribe({
      next: (response) => {
        console.log('Payment Successful:', response);
        window.location.href = response;
        this.loading = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Payment Failed:', error);
        this.loading = false;
      },
    });
  }

  resetForm() {
    this.shippingForm.reset();
    this.formSubmitted = false;
  }

  goToProducts() {
    this.cartService.toggleCart();
    this.router.navigate(['/products']);
  }
}

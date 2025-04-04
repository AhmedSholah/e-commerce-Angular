import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CheckoutService } from '../../Services/checkout.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { CartServiceService } from '../../Services/cart-service.service';


@Component({
  selector: 'app-checkout',
  imports: [CommonModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './checkout.component.html'
})
export class CheckoutComponent {
  paymentMethod: string = 'paypal';
  paymentForm: FormGroup;
  loading: boolean = false;
  cartItems: any[] = [];

  get subtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  get vat(): number {
    return this.subtotal * 0.14; 
  }

  get shipping(): number {
    return this.cartItems.length > 0 ? 10 : 0; 
  }

  get total(): number {
    return this.subtotal + this.vat + this.shipping;
  }

  increaseQuantity(index: number): void {
    this.cartItems[index].quantity++;
  }

  decreaseQuantity(index: number) {
    if (this.cartItems[index].quantity > 1) {
      this.cartItems[index].quantity--;
    }
  }

  removeItem(index: number): void {
    this.cartItems.splice(index, 1);
  }
  
  selectPayment(method: string) {
    this.paymentMethod = method;
  }
  constructor(private fb: FormBuilder,private checkoutService:CheckoutService, private router: Router,private cartService: CartServiceService) {

    this.paymentForm = this.fb.group({
      cardholderName: ['', Validators.required], 
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], 
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(\\d{2})$')]], 
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      address:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.\-\/]+$/)]]
    });
  }
  ngOnInit() {
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = [...items];
      console.log('Cart Items in Checkout:', this.cartItems);
    })
  }

  get cardholderName() {
    return this.paymentForm.get('cardholderName');
  }

  get cardNumber() {
    return this.paymentForm.get('cardNumber');
  }

  get expirationDate() {
    return this.paymentForm.get('expirationDate');
  }

  get cvv() {
    return this.paymentForm.get('cvv');
  }
  get address() {
    return this.paymentForm.get('address');
  }

  onSubmit() {
    if (this.paymentForm.invalid) {
      console.log('Form is not valid');
      return;
    }

    this.loading = true;
    console.log('Cart Items before sending:', this.cartItems);
    console.log('Total:', this.total);
    const paymentData = {
      ...this.paymentForm.value,
      paymentMethod: this.paymentMethod,
      cartItems: this.cartItems,
      total: this.total
    };
    console.log('Cart Items:', this.cartItems);
    console.log('Payment Data:', paymentData);


    this.checkoutService.processPayment(paymentData).subscribe({
      next: (response) => {
        console.log('Payment Successful:', response);
        this.router.navigate(['/checkout-confirmation']); 
        this.loading = false;
        this.resetForm();
      },
      error: (error) => {
        console.error('Payment Failed:', error);
        console.log('Payment Failed! Please try again.');
        this.loading = false;
      }
    });
  }


  resetForm() {
    this.paymentForm.reset();
  }
}
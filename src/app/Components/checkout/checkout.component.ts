import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent {
  paymentMethod: string = 'paypal';

  cartItems = [
    { id: 1, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
    { id: 2, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
    { id: 3, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
    { id: 4, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
    { id: 5, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
    { id: 6, name: 'Pure Chakra', price: 350, originalPrice: 400, quantity: 1, image: 'Bag.png' },
  ];

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
  paymentForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.paymentForm = this.fb.group({
      cardholderName: ['', Validators.required], 
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]], 
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])/(\\d{2})$')]], 
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]],
      address:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9\s,.\-\/]+$/)]]
    });
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
    if (this.paymentForm.valid) {
      console.log(this.paymentForm.value);
    } else {
      console.log('not valid');
    }
  }
  resetForm() {
    this.paymentForm.reset();
  }
}

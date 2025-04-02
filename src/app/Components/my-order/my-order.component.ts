import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { AuthService  } from '../../Services/auth.service';


interface Order {
  _id: string;
  user: string;
  orderItems: {
    product: {
      _id: string;
      name: string;
      price: number;
      rating: number;
      images: string[];
      discountAmount: number;
      discountPercentage: number;
      category: string;
      description: string;
      quantity: number;
      weight: number;
      dimensions: {
        length: number;
        width: number;
        height: number;
        _id: string;
        id: string;
      };
      shippingInfo: {
        shippingCost: number;
        estimatedDelivery: number;
        _id: string;
        id: string;
      };
      soldBy: string;
      createdAt: string;
      updatedAt: string;
      __v: number;
      image: string;
      priceAfterDiscount: number;
      imageUrl: string | null;
      id: string;
    };
    quantity: number;
    price: number;
    _id: string;
  }[];
  shippingAddress: string;
  totalPrice: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
  orderNumber:number;
  
}


interface OrderResponse {
  status: string;
  message?: string;
  data: Order[];
}

@Component({
  selector: 'app-my-order',
  standalone: true,
  imports: [CommonModule, CartComponent, HttpClientModule],
  templateUrl: './my-order.component.html',
  // styleUrl: './my-order.component.css'
})

export class MyOrderComponent implements OnInit {
  orders: Order[] = [];
  isButtonClicked: { [key: string]: boolean } = {};

  constructor(private http: HttpClient, private authService: AuthService) {}

  ngOnInit() {
    this.fetchOrders();
  }

  fetchOrders() {
    const token = localStorage.getItem('authToken'); 

    if (!token) {
      console.error('No token found!');
      return;
    }

    const headers = { Authorization: `Bearer ${token}` };

    this.http.get<OrderResponse>('https://e-commerce-node-js-psi.vercel.app/api/orders', { headers })
      .subscribe(response => {
        if (response.status === 'success') {
          this.orders = response.data;
        } else {
          console.error('Error fetching orders:', response.message);
        }
      }, error => {
        console.error('Error fetching orders:', error);
      });
  }

  cancelOrder(orderId: string) {
    console.log(`Cancelling order: ${orderId}`);
  
    this.authService.cancelOrder(orderId).subscribe(
      (response: any) => {
        console.log("Order cancelled successfully:", response);
        const order = this.orders.find(o => o._id === orderId);
        if (order) {
          order.orderStatus = "cancelled";
        }
      },
      (error: any) => {
        console.error("Failed to cancel order:", error);
      }
    );
  }

  disableButton(orderId: string) {
    this.isButtonClicked[orderId] = true; 
  }
}

import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { FavProductComponent } from './Pages/fav-product/fav-product.component';
import { HomeComponent } from './Pages/home/home.component';
import { MainLayoutComponent } from './Components/Layouts/main-layout/main-layout.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';


import { CartComponent } from './Components/cart/cart.component';

import { MyOrderComponent } from './Components/my-order/my-order.component';

import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CheckoutConfirmationComponent } from './Components/checkout-confirmation/checkout-confirmation.component';

import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
            },
            {
                path: 'products',
                component: ProductsComponent,
            },
            {
                path: 'about-us',
                component: AboutUsComponent,
            },
            {
                path: 'contact-us',
                component: ContactUsComponent,
            },
            {
                path: 'favorite-products',
                component: FavProductComponent,
                canActivate: [authGuard],
            },
            {
                path: 'product/:id',
                component: ProductDetailsComponent,
            },
            {
                path: 'profile',
                component: EditProfileComponent,
                canActivate: [authGuard],
            },
            {
                path: 'myOrder',
                component: MyOrderComponent,
                canActivate: [authGuard],
            },
            {
                path: 'checkout',
                component: CheckoutComponent,
                canActivate: [authGuard],
            },
            {
                path: 'checkout-confirmation',
                component: CheckoutConfirmationComponent,
                canActivate: [authGuard],
            },
            {
                path: '**',
                component: HomeComponent,
            },
            { path: 'cart', component: CartComponent },
            { path: 'checkout', component: CheckoutComponent },
            { path: 'checkout-confirmation', component: CheckoutConfirmationComponent },
        ],
    },
];


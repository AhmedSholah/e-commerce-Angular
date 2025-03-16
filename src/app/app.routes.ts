import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { TrendingComponent } from './Pages/trending/trending.component';
import { ProductsComponent } from './Pages/products/products.component';
import { ProductDetailsComponent } from './Pages/product-details/product-details.component';
import { ContactUsComponent } from './Pages/contact-us/contact-us.component';
import { EditProfileComponent } from './Pages/edit-profile/edit-profile.component';
import { FavProductComponent } from './Pages/fav-product/fav-product.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'trending', component: TrendingComponent },
    { path: 'products', component: ProductsComponent },
    { path: 'productdetails', component: ProductDetailsComponent },
    { path: 'contactus', component: ContactUsComponent },
    { path: 'editProfile', component: EditProfileComponent },
    { path: 'favProduct', component: FavProductComponent },
];




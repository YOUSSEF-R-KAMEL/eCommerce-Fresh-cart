import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './core/layouts/blank-layout/blank-layout.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LoginComponent } from './core/auth/components/login/login.component';
import { RegisterComponent } from './core/auth/components/register/register.component';
import { HomeComponent } from './feature/home/home.component';
import { CategoriesComponent } from './feature/categories/categories.component';
import { BrandComponent } from './feature/brand/brand.component';
import { ProductsComponent } from './feature/products/products.component';
import { CartComponent } from './feature/cart/cart.component';

export const routes: Routes = [
  { path: '', component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: "login", pathMatch: 'full' },
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
    ]
  },
  { path: 'blank', component: BlankLayoutComponent,
    children: [
      { path: '', redirectTo: "home", pathMatch: 'full' },
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'brands', component: BrandComponent},
      {path: 'cart', component: CartComponent},
    ]
  },
  { path: '**', component: NotFoundComponent },

];

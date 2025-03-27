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
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { ProductDetailsComponent } from './feature/product-details/product-details.component';
import { CategoryDetailsComponent } from './feature/category-details/category-details.component';
import { ForgetComponent } from './core/auth/components/forget/forget.component';

export const routes: Routes = [
  { path: '', component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', redirectTo: "login", pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forget', component: ForgetComponent },
    ]
  },
  { path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: "home", pathMatch: 'full' },
      {path: 'home', component: HomeComponent},
      {path: 'products', component: ProductsComponent},
      {path: 'productDetails/:id', component: ProductDetailsComponent},
      {path: 'categories', component: CategoriesComponent},
      {path: 'categoryDetails/:id', component: CategoryDetailsComponent},
      {path: 'brands', component: BrandComponent},
      {path: 'cart', component: CartComponent},
    ]
  },
  { path: '**', component: NotFoundComponent },

];

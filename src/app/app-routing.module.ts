import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './components/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CartComponent } from './components/cart/cart.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './shared/guards/auth.guard';
import { DetailsComponent } from './components/details/details.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [
  {path:"",component:BlankLayoutComponent,
  canActivate:[authGuard],
  children:
  [
    {
      path:'', redirectTo:'home',pathMatch:'full'
    },
    {
      path:'home',component:HomeComponent
    },
    {
      path:'setting',loadChildren:()=>import('./setting/setting.module').then((M)=>M.SettingModule)
    },
    {
      path:'checkout/:id',component:CheckOutComponent
    },
    {
      path:'details/:id',component:DetailsComponent
    },
    {
      path:'cart',component:CartComponent
    }, 
    {
      path:'wish',component:WishListComponent
    },
    {
      path:'products',component:ProductsComponent
    },
    {
      path:'categories',component:CategoriesComponent
    },
    {
      path:'brands',component:BrandsComponent
    }

  ]

},
  {path:"",component:AuthLayoutComponent,
  children:
  [
    {
      path:'login',component:LoginComponent
    },
    {
      path:'register',component:RegisterComponent
    }
    ,
    {
      path:'forgetPassword', component:ForgetPasswordComponent
    },
    {
      path:'verifyCode' , component:VerifyCodeComponent
    },
    {
      path:'resetPassword',component:ResetPasswordComponent
    }
  ]

},
  {path:'**',component:NotFoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { BrandDeleteComponent } from './component/brand-delete/brand-delete.component';
import { BrandManagerComponent } from './component/brand-manager/brand-manager.component';
import { BrandUpdateComponent } from './component/brand-update/brand-update.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { CarDeleteComponent } from './component/car-delete/car-delete.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { CarManagerComponent } from './component/car-manager/car-manager.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { CarComponent } from './component/car/car.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { ColorDeleteComponent } from './component/color-delete/color-delete.component';
import { ColorManagerComponent } from './component/color-manager/color-manager.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { LoginComponent } from './component/login/login.component';
import { PaymentComponent } from './component/payment/payment.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",pathMatch:"full",component:CarComponent},
  {path:"login",component:LoginComponent},
  {path:"cars",component:CarComponent},
  {path:"cars/manager",component:CarManagerComponent,canActivate:[LoginGuard]},
  {path:"cars/manager/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"cars/manager/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/manager/delete/:carId",component:CarDeleteComponent,canActivate:[LoginGuard]},
  {path:"cars/brand/:brandId",component:CarComponent},
  {path:"cars/color/:colorId",component:CarComponent},
  {path:"cars/color/:colorId:brandId",component:CarComponent},
  {path:"cardetails/:carId",component:CarDetailsComponent},
  {path:"rental/payment",component:PaymentComponent},
  {path:"brands/manager",component:BrandManagerComponent,canActivate:[LoginGuard]},
  {path:"brands/manager/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"brands/manager/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/manager/delete/:brandId",component:BrandDeleteComponent,canActivate:[LoginGuard]},
  {path:"colors/manager/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"colors/manager/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/manager/delete/:colorId",component:ColorDeleteComponent,canActivate:[LoginGuard]},
  {path:"colors/manager",component:ColorManagerComponent,canActivate:[LoginGuard]},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

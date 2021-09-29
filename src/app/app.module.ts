import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './component/nav/nav.component';
import { BrandComponent } from './component/brand/brand.component';
import { CarComponent } from './component/car/car.component';
import { ColorComponent } from './component/color/color.component';
import { CustomerComponent } from './component/customer/customer.component';
import { RentalComponent } from './component/rental/rental.component';
import { CarDetailsComponent } from './component/car-details/car-details.component';
import { SanitizerService } from './services/sanitizer.service';
import { VatAddedPipe } from './pipes/vat-added.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrandFilterPipe } from './pipes/brand-filter.pipe';
import { ColorFilterPipe } from './pipes/color-filter.pipe';
import { CarDetailFilterPipe } from './pipes/car-detail-filter.pipe';
import { PaymentComponent } from './component/payment/payment.component';
import { CarAddComponent } from './component/car-add/car-add.component';
import { BrandAddComponent } from './component/brand-add/brand-add.component';
import { ColorAddComponent } from './component/color-add/color-add.component';
import { ColorManagerComponent } from './component/color-manager/color-manager.component';
import { ColorUpdateComponent } from './component/color-update/color-update.component';
import { ColorDeleteComponent } from './component/color-delete/color-delete.component';
import { CarUpdateComponent } from './component/car-update/car-update.component';
import { BrandUpdateComponent } from './component/brand-update/brand-update.component';
import { BrandManagerComponent } from './component/brand-manager/brand-manager.component';
import { BrandDeleteComponent } from './component/brand-delete/brand-delete.component';
import { CarDeleteComponent } from './component/car-delete/car-delete.component';
import { CarManagerComponent } from './component/car-manager/car-manager.component';
import { LoginComponent } from './component/login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    BrandComponent,
    CarComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    CarDetailsComponent,
    VatAddedPipe,
    BrandFilterPipe,
    ColorFilterPipe,
    CarDetailFilterPipe,
    PaymentComponent,
    CarAddComponent,
    BrandAddComponent,
    ColorAddComponent,
    ColorManagerComponent,
    ColorUpdateComponent,
    ColorDeleteComponent,
    CarUpdateComponent,
    BrandUpdateComponent,
    BrandManagerComponent,
    BrandDeleteComponent,
    CarDeleteComponent,
    CarManagerComponent,
    LoginComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass:"toast-bottom-right"
    }),
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SanitizerService,{
    provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

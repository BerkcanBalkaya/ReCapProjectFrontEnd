import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

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
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [SanitizerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

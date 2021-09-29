import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.scss'],
})
export class CarAddComponent implements OnInit {
  carAddForm: FormGroup;
  currentColorId: number = -1;
  currentBrandId: number = -1;
  responseLoaded:boolean=false;
  brands: Brand[];
  colors: Color[];
  constructor(
    private formBuilder: FormBuilder,
    private carService: CarService,
    private brandService: BrandService,
    private colorService: ColorService,
    private dateTimeService: DateTimeService,
    private toastrService: ToastrService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.createCarDetailAddForm();
    this.getBrands();
    this.getColors();
  }

  createCarDetailAddForm() {
    this.carAddForm = this.formBuilder.group({
      description: ['', Validators.required],
      brandId: ['', Validators.compose([Validators.required,Validators.min(1)])],
      colorId: ['', Validators.compose([Validators.required,Validators.min(1)])],
      modelYear: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1930),
          Validators.max(parseInt(this.getCurrentYear())),
        ]),
      ],
      dailyPrice: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  add() {
    if (this.carAddForm.valid) {
      let carModel = Object.assign({}, this.carAddForm.value);
      this.carService.add(carModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message);
          this.responseLoaded=true;
          if(this.responseLoaded===true){
            setInterval(()=>{
              this.backToList();
            },500)
          }
        },
        (responseError) => {
          console.log(responseError)
          if (!responseError.error.Errors) {
            this.toastrService.error(
              responseError.error.ErrorMesage,
              'Error'
            );
          }
          else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Error'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form Invalid');
    }
  }

  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }
  getCurrentYear() {
    return this.dateTimeService.getCurrentYear();
  }

  backToList() {
    this.router.navigate(['cars/manager']).then(() => {
      window.location.reload();
    });
  }

  createCarAddForm() {
    this.carAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}

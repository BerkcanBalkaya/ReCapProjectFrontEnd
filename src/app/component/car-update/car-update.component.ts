import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';
import { ColorService } from 'src/app/services/color.service';
import { DateTimeService } from 'src/app/services/date-time.service';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.scss']
})
export class CarUpdateComponent implements OnInit {
  brands: Brand[] = [];
  colors: Color[] = [];

  carUpdateForm: FormGroup;

  selectedBrandId: number = -1;
  selectedColorId: number = -1;
  carToUpdate: Car;

  carLoaded: boolean = false;
  responseLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private carService: CarService,
    private colorService: ColorService,
    private dateTimeService: DateTimeService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getById(params['carId']);
        this.createCarUpdateForm();
        this.getAllBrands();
        this.getAllColors();
      }
    });
  }

  createCarUpdateForm(): void {
    this.carUpdateForm = this.formBuilder.group({
      brandId: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      description: ['', Validators.required],
      modelYear: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1960),
          Validators.max(parseInt(this.getYear())),
        ]),
      ],
      colorId: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
      dailyPrice: [
        '',
        Validators.compose([Validators.required, Validators.min(0)]),
      ],
    });
  }

  getById(carId: number): void {
    this.carService.getCarById(carId).subscribe((response) => {
      this.carToUpdate = response.data;
      this.selectedBrandId = response.data.brandId;
      this.selectedColorId = response.data.colorId;
      this.carLoaded = true;
    });
  }

  update(): void {
    if (this.carUpdateForm.valid) {
      let carModel: Car = Object.assign({}, this.carUpdateForm.value);
      carModel.id = this.carToUpdate.id;
      this.carService.update(carModel).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success!');
          this.responseLoaded = true;
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        },
        (responseError) => {
          if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors.ErrorMessage[i],
                'Validation Error!'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form not valid!');
    }
  }

  getAllBrands(): void {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  getAllColors(): void {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }

  getYear(): string {
    return this.dateTimeService.getCurrentYear();
  }

  backToList() {
    this.router.navigate(['cars/list']).then(() => {
      window.location.reload();
    });
  }
}

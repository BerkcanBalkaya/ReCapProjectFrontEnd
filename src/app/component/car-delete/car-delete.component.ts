import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-delete',
  templateUrl: './car-delete.component.html',
  styleUrls: ['./car-delete.component.scss']
})
export class CarDeleteComponent implements OnInit {
  car: Car;
  carDetails: CarDetail;
  responseLoaded: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private carService: CarService,
    private carDetailSerivce:CarDetailService,
    private router: Router,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['carId']) {
        this.getById(params['carId']);
        this.getCarDetailsById(params['carId']);
      }
    });
  }

  getById(carId: number): void {
    this.carService.getCarById(carId).subscribe((response) => {
      this.car = response.data;
    });
  }

  getCarDetailsById(carId: number): void {
    this.carDetailSerivce.getCarDetailsByCarId(carId).subscribe((response) => {
      this.carDetails = response.data;
    });
  }

  delete(): void {
    if (this.car) {      
      this.carService.delete(this.car).subscribe(
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
          if (!responseError.error.Errors) {
            this.toastrService.error(
              responseError.error.ErrorMessage,
              'Error!'
            );
            this.responseLoaded = true;
          } else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error!'
              );
              this.responseLoaded = true;
            }
          }
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        }
      );
    } else {
      this.toastrService.error('Invalid form information.', 'Error!');
    }
  }

  backToList() {
    this.router.navigate(['cars/manager']).then(() => {
      window.location.reload();
    });
  }
}

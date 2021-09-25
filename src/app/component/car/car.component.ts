import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { SanitizerService } from 'src/app/services/sanitizer.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  carsDetails: CarDetail[];
  carThumbnails: CarImage[] = [];
  imagesLoaded: boolean = false;
  carsLoaded:boolean= false;

  constructor(
    private carDetailService: CarDetailService,
    private sanitizerService: SanitizerService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getCarDetailsByBrandId(params['brandId']);
      }
      else if (params['colorId']) {
        this.getCarDetailsByColorId(params['colorId']);
      }
      else if (params['colorId'] && params['brandId']) {
        this.getCarDetailsByColorAndBrandId(
          params['colorId'],
          params['brandId']
        );
      } else {
        this.getCarDetails();
      }
    });
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carsDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getCarDetailsByBrandId(brandId: number) {
    this.carDetailService
      .getCarDetailsByBrandId(brandId)
      .subscribe((response) => {
        this.carsDetails = response.data;
        this.isCarsLoaded();
      });
  }

  getCarDetailsByColorId(colorId: number) {
    this.carDetailService
      .getCarDetailsByColorId(colorId)
      .subscribe((response) => {
        this.carsDetails = response.data;
        this.isCarsLoaded();
      });
  }

  getCarDetailsByColorAndBrandId(colorId: number, brandId: number) {
    this.carDetailService
      .getCarDetailsByColorAndBrandId(colorId, brandId)
      .subscribe((response) => {
        this.carsDetails = response.data;
        this.isCarsLoaded();
      });
  }

  getCarThumbnailByCarId(carId: number): void {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carThumbnails.push(response.data[0]);
    });
  }
  
  setCarThumbnails(): void {
    this.carsDetails.forEach((c) => {
      this.getCarThumbnailByCarId(c.carId);
    });
  }
  
  getCarThumbnailUrl(carId: number): SafeUrl {
    let imagePath: string = '';
    this.carThumbnails.forEach((image) => {
      if (image.carId === carId) {
        imagePath = image.imagePath;
      }
    });
    return this.sanitizerService.sanitizeUrl(imagePath);
  }
  
  isCarsLoaded(): void {
    this.carsLoaded = true;
    if (this.carsLoaded) this.setCarThumbnails();
  }
}



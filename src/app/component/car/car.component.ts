import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { ColorService } from 'src/app/services/color.service';
import { SanitizerService } from 'src/app/services/sanitizer.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss'],
})
export class CarComponent implements OnInit {
  carsDetails: CarDetail[];
  colors:Color[];
  brands:Brand[];
  carFilter="";
  carThumbnails: CarImage[] = [];
  imagesLoaded: boolean = false;
  carsLoaded:boolean= false;
  currentCarDetail?:CarDetail;
  currentBrandId:number=-1;
  currentColorId:number=-1;

  constructor(
    private toasterService:ToastrService,
    private carDetailService: CarDetailService,
    private sanitizerService: SanitizerService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private brandService:BrandService,
    private colorService:ColorService
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
      this.getColors();
      this.getBrands();
    });
  }
  addToFavorites(carDetail:CarDetail){
    this.toasterService.success("added to favorites",carDetail.carName)
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    });
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
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

  getCarDetailsByFilter(colorId: number, brandId: number){
    if (colorId!=-1 && brandId !=-1) {
      this.getCarDetailsByColorAndBrandId(colorId ,brandId)
    }else if(colorId!=-1 && brandId ==-1){
      this.getCarDetailsByColorId(colorId);
    }else if(colorId==-1 && brandId !=-1){
      this.getCarDetailsByBrandId(brandId)
    }else{
      this.getCarDetails();
    }
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

  setCurrentCarDetailEmpty() {
    this.currentCarDetail = undefined;
  }

  setCurrentCarDetail(carDetail: CarDetail) {
    this.currentCarDetail = carDetail;
  }
  setCurrentBrand(brand: Brand) {
    this.currentBrandId = brand.id;
  }
  setCurrentColor(color:Color){
    this.currentColorId=color.id;
  }
  
  isCarsLoaded(): void {
    this.carsLoaded = true;
    if (this.carsLoaded) this.setCarThumbnails();
  }

  getCurrentCarDetailClass(carDetail?: CarDetail) {
    if (carDetail == this.currentCarDetail) {
      return 'list-group-item active';
    } else {
      return 'list-group-item';
    }
  }
}



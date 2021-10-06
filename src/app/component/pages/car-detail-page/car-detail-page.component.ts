import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { SanitizerService } from 'src/app/services/sanitizer.service';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.scss']
})
export class CarDetailPageComponent implements OnInit {
  currentImage:CarImage;
  carImages:CarImage[]=[];
  carDetail:CarDetail;
  imagesLoaded:boolean = false;
  detailsLoaded:boolean = false;

  constructor(private carDetailService: CarDetailService,
    private dateTimeService:DateTimeService,
    private carService: CarService,
    private activatedRoute: ActivatedRoute,
    private carImageService: CarImageService,
    private sanitizerService: SanitizerService ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if (params["carId"]) {
        this.getCarImages(params["carId"]);
        this.getCarDetail(params["carId"]);
      }
    });
  }

  getCarImages(carId:number):void{
    this.carImageService.getCarImages(carId).subscribe(response=>{
      this.carImages = response.data;
      this.imagesLoaded = true;
      if (this.imagesLoaded) {
        this.currentImage=this.carImages[0];
      }
    })
  }

  getCarDetail(carId:number):void{
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDetail=response.data;
      this.detailsLoaded=true;
    })
  }

}

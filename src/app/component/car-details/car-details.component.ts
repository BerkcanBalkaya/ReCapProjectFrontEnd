import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/carDetail';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';
import { SanitizerService } from 'src/app/services/sanitizer.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss']
})
export class CarDetailsComponent implements OnInit {
  currentImage:CarImage;
  carImages:CarImage[]=[];
  carDetail:CarDetail;
  imagesLoaded:boolean = false;
  detailsLoaded:boolean = false;


  constructor(private carDetailService: CarDetailService,
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

  getCarImageUrl(carImage:CarImage):SafeUrl{
    return this.sanitizerService.sanitizeUrl(carImage.imagePath);
  }

  getCurrentImageClass(image: CarImage) {
    if (image == this.currentImage) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getPreviousImage(){
    let currentIndex= this.carImages.indexOf(this.currentImage)
    if (currentIndex===0) {
      this.currentImage= this.carImages[this.carImages.length-1];
    }
    else{
      this.currentImage=this.carImages[currentIndex-1];
    }
  }

  getNextImage(){
    let currentIndex= this.carImages.indexOf(this.currentImage)
    if (currentIndex===this.carImages.length-1) {
      this.currentImage= this.carImages[0];
    }
    else{
      this.currentImage=this.carImages[currentIndex+1];
    }
  }

}

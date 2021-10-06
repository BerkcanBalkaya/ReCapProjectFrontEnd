import {
  Component,
  HostListener,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import {
  faBars,
  faCar,
  faCircle,
  faHome,
  faTimes,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import SwiperCore, { Pagination } from 'swiper';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarImage } from 'src/app/models/carImage';
import { SafeUrl } from '@angular/platform-browser';
import { SanitizerService } from 'src/app/services/sanitizer.service';

SwiperCore.use([Pagination]);

@Component({
  selector: 'app-home-swiper-featured',
  styleUrls: ['./home-swiper-featured.component.scss'],
  templateUrl: './home-swiper-featured.component.html',
  encapsulation: ViewEncapsulation.None
})
export class HomeSwiperFeaturedComponent implements OnInit {
  faCircle = faCircle;
  carDetails:CarDetail[]=[];
  carThumbnails:CarImage[]=[];
  carLoaded:boolean=false;

  constructor(
    private carDetailService:CarDetailService,
    private carImageService:CarImageService,
    private sanitizerService:SanitizerService,
    ) {}

  ngOnInit(): void {
    this.getTopTenMostRentedCars()
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
  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getTopTenMostRentedCars(){
    this.carDetailService.getTopTenMostRentedCars().subscribe((response) => {
      this.carDetails = response.data;
      this.isCarsLoaded();
    });
  }

  getCarThumbnailByCarId(carId: number): void {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carThumbnails.push(response.data[0]);
    });
  }
  isCarsLoaded(): void {
    this.carLoaded = true;
    if (this.carLoaded) this.setCarThumbnails();
  }
  setCarThumbnails(): void {
    this.carDetails.forEach((c) => {
      this.getCarThumbnailByCarId(c.carId);
    });
  }
}

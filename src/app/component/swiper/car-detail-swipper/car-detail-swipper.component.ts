import {
  Component,
  HostListener,
  Input,
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
  selector: 'app-car-detail-swipper',
  styleUrls: ['./car-detail-swipper.component.scss'],
  templateUrl: './car-detail-swipper.component.html',
  encapsulation: ViewEncapsulation.None
})
export class CarDetailSwipperComponent implements OnInit {
  faCircle = faCircle;
  carImages:CarImage[]=[];
  carLoaded:boolean=false;
  @Input() carDetail:CarDetail; 

  constructor(
    private carDetailService:CarDetailService,
    private carImageService:CarImageService,
    private sanitizerService:SanitizerService,
    ) {}

  ngOnInit(): void {
    this.getCarImagesByCarId(this.carDetail.carId)
  }
  
  getCarImageUrl(carImage: CarImage): SafeUrl {
    return this.sanitizerService.sanitizeUrl(carImage.imagePath);
  }
  
  getCarImagesByCarId(carId: number): void {
    this.carImageService.getCarImages(carId).subscribe((response) => {
      this.carImages=response.data;
    });
  }
  setCarImages(): void {
      this.getCarImagesByCarId(this.carDetail.carId);
  }
}

import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/carDetail';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-manager',
  templateUrl: './car-manager.component.html',
  styleUrls: ['./car-manager.component.scss']
})
export class CarManagerComponent implements OnInit {
  cars:CarDetail[]=[];
  carsLoaded:boolean=false;
  constructor(private carDetailService:CarDetailService) { }

  ngOnInit(): void {
    this.getCars();
  }

  getCars(){
    this.carDetailService.getCarDetails().subscribe((response)=> {
      this.cars=response.data;
      this.carsLoaded=true;
    })
  }

}

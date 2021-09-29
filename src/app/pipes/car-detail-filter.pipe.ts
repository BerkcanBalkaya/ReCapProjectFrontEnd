import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/carDetail';

@Pipe({
  name: 'carDetailFilter'
})
export class CarDetailFilterPipe implements PipeTransform {

  transform(value: CarDetail[], filterCarDetail: string): CarDetail[] {
    filterCarDetail= filterCarDetail?filterCarDetail.toLocaleLowerCase():""
    return filterCarDetail?value
    .filter((c:CarDetail)=>c.carName.toLocaleLowerCase().indexOf(filterCarDetail)!==-1)
    :value;
  }

}

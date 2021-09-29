import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/color';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], filterColor: string): Color[] {
    filterColor= filterColor?filterColor.toLocaleLowerCase():""
    return filterColor?value
    .filter((b:Color)=>b.name.toLocaleLowerCase().indexOf(filterColor)!==-1)
    :value;
  }

}

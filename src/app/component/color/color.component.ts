import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.scss']
})
export class ColorComponent implements OnInit {
  colors:Color[];
  currentColor?:Color;
  colorFilterHeader:string = "Colors"
  colorFilter="";
  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data
    });
  }

  setCurrentColor(color:Color){
    this.currentColor=color;
  }

  setCurrentColorEmpty() {
    this.currentColor = undefined;
  }

  getCurrentColorClass(color?:Color){
    if (color==this.currentColor) {
      return 'list-group-item active';
    }else{
      return 'list-group-item';
    }
  }
}


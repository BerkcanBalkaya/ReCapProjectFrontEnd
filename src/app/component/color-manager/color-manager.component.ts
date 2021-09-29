import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-manager',
  templateUrl: './color-manager.component.html',
  styleUrls: ['./color-manager.component.scss'],
})
export class ColorManagerComponent implements OnInit {
  colors: Color[] = [];
  constructor(private colorService: ColorService) {}

  ngOnInit(): void {
    this.getColors();
  }
  
  getColors() {
    this.colorService.getColors().subscribe((response) => {
      this.colors = response.data;
    });
  }
}

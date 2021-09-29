import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.scss']
})
export class ColorAddComponent implements OnInit {
  colorAddForm:FormGroup;
  responseLoaded:boolean=false; 
  constructor(private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService:ColorService,
    private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  add() {
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.add(colorModel).subscribe(
        (response) => {
          console.log(response);
          this.toastrService.success(response.message);
          this.responseLoaded = true;
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        },
        (responseError) => {
          if (!responseError.error.Errors) {
            this.toastrService.error(
              responseError.error.ErrorMessage,
              'Error!'
            );
          }
          else if (responseError.errors.Errors.length > 0) {
            for (let i = 0; i < responseError.errors.Errors.length; i++) {
              this.toastrService.error(
                responseError.errors.Errors[i].ErrorMessage,
                'Validation Errors'
              );
            }
          }
        }
      );
    } else {
      this.toastrService.error('Form Invalid');
    }
  }
  backToList() {
    this.router.navigate(['colors/manager']).then(() => {
      window.location.reload();
    });
  }

  createColorAddForm() {
    this.colorAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}

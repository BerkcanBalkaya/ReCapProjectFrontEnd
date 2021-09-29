import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.scss'],
})
export class BrandAddComponent implements OnInit {
  brandAddForm:FormGroup;
  responseLoaded:boolean=false; 
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService:BrandService,
    private router:Router) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }
  add() {
    if (this.brandAddForm.valid) {
      let brandModel = Object.assign({}, this.brandAddForm.value);
      this.brandService.add(brandModel).subscribe(
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
    this.router.navigate(['brands/manager']).then(() => {
      window.location.reload();
    });
  }

  createBrandAddForm() {
    this.brandAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}

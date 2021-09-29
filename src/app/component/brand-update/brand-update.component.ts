import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.scss']
})
export class BrandUpdateComponent implements OnInit {
  brand: Brand;
  brandUpdateForm: FormGroup;
  responseLoaded: boolean = false;
  brandLoaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private brandService: BrandService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.createBrandUpdateForm();
        this.getByBrandId(params.brandId);
      }
    });
  }

  update() {
    if (this.brandUpdateForm.valid) {
      let colorModel = Object.assign({}, this.brandUpdateForm.value);
      colorModel.id = this.brand.id;
      this.brandService.update(colorModel).subscribe(
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
          } else if (responseError.errors.Errors.length > 0) {
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

  getByBrandId(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandLoaded=true;
    });
  }

  createBrandUpdateForm() {
    this.brandUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}

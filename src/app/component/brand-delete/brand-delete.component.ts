import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-delete',
  templateUrl: './brand-delete.component.html',
  styleUrls: ['./brand-delete.component.scss']
})
export class BrandDeleteComponent implements OnInit {
  brand:Brand;
  brandLoaded:boolean =false;
  responseLoaded :boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private router: Router,
    private toastrService: ToastrService) { 
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['brandId']) {
        this.getBrandById(params['brandId']);
      }
    });
  }

  getBrandById(brandId: number): void {
    this.brandService.getBrandById(brandId).subscribe((response) => {
      this.brand = response.data;
      this.brandLoaded = true;
    });
  }

  delete(): void {
    if (this.brand) {
      this.brandService.delete(this.brand).subscribe(
        (response) => {
          this.toastrService.success(response.message, 'Success!');
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
            this.responseLoaded = true;
          } else if (responseError.error.Errors.length > 0) {
            for (let i = 0; i < responseError.error.Errors.length; i++) {
              this.toastrService.error(
                responseError.error.Errors[i].ErrorMessage,
                'Validation Error!'
              );
              this.responseLoaded = true;
            }
          }
          if (this.responseLoaded === true) {
            setInterval(() => {
              this.backToList();
            }, 500);
          }
        }
      );
    } else {
      this.toastrService.error('Invalid form information.', 'Error!');
    }
  }

  backToList() {
    this.router.navigate(['brands/manager']).then(() => {
      window.location.reload();
    });
  }

}

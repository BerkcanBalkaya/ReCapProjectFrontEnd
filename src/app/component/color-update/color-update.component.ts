import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.scss'],
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;
  responseLoaded: boolean = false;
  colorLoaded: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private colorService: ColorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      if (params['colorId']) {
        this.createColorUpdateForm();
        this.getByColorId(params.colorId);
      }
    });
  }

  update() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      colorModel.id = this.color.id;
      this.colorService.update(colorModel).subscribe(
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
    this.router.navigate(['colors/manager']).then(() => {
      window.location.reload();
    });
  }

  getByColorId(colorId: number) {
    this.colorService.getColorById(colorId).subscribe((response) => {
      this.color = response.data;
      this.colorLoaded=true;
    });
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }
}

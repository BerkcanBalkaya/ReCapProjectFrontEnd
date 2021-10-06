import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  @Input() registerFormClass:string;
  registerForm:FormGroup;
  faTimes=faTimes;

  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private router:Router) { }

  ngOnInit(): void {
    this.createRegisterForm();
  }
  
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
    })
  }

  register() {
    if (this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
     
        this.authService.register(registerModel).subscribe(response => {

            this.toastrService.success(response.message, "Kayıt olundu");
            // this.router.navigate(["/login"]);
        }
        )
    }
    else {
      this.toastrService.error("Form Eksik", "Hata")
    }
  }
  closeRegisterFormClick() {
    let registerFormContainer = document.querySelector('.register-form-container');
    if (registerFormContainer) {
      registerFormContainer.classList.remove('active');
    }
  }

}
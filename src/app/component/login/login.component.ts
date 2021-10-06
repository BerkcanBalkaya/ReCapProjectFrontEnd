import { Component, Input, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators,FormBuilder } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { LoginModel } from 'src/app/models/loginModel';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() loginFormClass:string;
  faTimes=faTimes;
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder,
    private authService:AuthService,
    private toastrService:ToastrService,
    private localStorageService:LocalStorageService,
    private userService:UserService) { }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm=this.formBuilder.group({
      email:["",Validators.required],
      password:["",Validators.required]
    })
  }
  login(){
    if (this.loginForm.valid) {
      let loginModel:LoginModel = Object.assign({},this.loginForm.value)
      this.authService.login(loginModel).subscribe(response => {
        this.toastrService.info(response.message);
        this.localStorageService.add("token",response.data.token);
        this.userService.getUserByMail(loginModel.email).subscribe(response => {
          this.localStorageService.setUserDetails(response.data)
        })
        this.closeLoginFormClick();
        window.location.reload();
      },responseError=>{
        this.toastrService.error(responseError.console.error);
      })
    }
  }

  closeLoginFormClick() {
    let loginFormContainer = document.querySelector('.login-form-container');
    if (loginFormContainer) {
      loginFormContainer.classList.remove('active');
    }
  }

}

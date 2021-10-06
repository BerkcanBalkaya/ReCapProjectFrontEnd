import { Component, OnInit } from '@angular/core';
import { faBars, faTimes, faUser, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/models/user';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  faBars = faBars;
  faTimes=faTimes;
  faUser=faUser;
  
  faTemp:IconDefinition;

  registerFormChild:string="register-form-container";
  loginFormChild:string="login-form-container";
  signButtonWrapperClass:string="sign-button-wrapper"
  loginCheckInfo:User;

  user:User;
  constructor(
    private localStorageService:LocalStorageService,
  ) { }
  ngOnInit(): void {
    this.loginCheck();
  }

  loginCheck(){
    this.loginCheckInfo = this.localStorageService.getUserDetails()
  }

  logOut(){
    this.localStorageService.clear()
    this.loginCheckInfo=undefined;
  }

  menuClick() {
    this.faTemp = this.faBars;
    this.faBars = this.faTimes;
    this.faTimes = this.faTemp;
    let navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.toggle('active');
    }
  }

  homeLoginClick() {
    let loginFormContainer = document.querySelector('.login-form-container');
    if (loginFormContainer) {
      loginFormContainer.classList.toggle('active');
    }
  }

  homeRegisterClick() {
    let loginFormContainer = document.querySelector('.register-form-container');
    if (loginFormContainer) {
      loginFormContainer.classList.toggle('active');
    }
  }
}

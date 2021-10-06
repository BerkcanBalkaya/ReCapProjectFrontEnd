import { Component, HostListener, OnInit } from '@angular/core';
import {
  faBars,
  faCar,
  faCircle,
  faHome,
  faTimes,
  faUser,
  IconDefinition,
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  faHome = faHome;
  faCar = faCar;
  faUser = faUser;
  faBars = faBars;
  faTimes = faTimes;
  faCircle=faCircle;
  
  faTemp: IconDefinition;
  
  registerFormChild:string="register-form-container";
  loginFormChild:string="login-form-container";

  constructor() {
    
  }

  ngOnInit(): void {}

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    let navbar = document.querySelector('.navbar');
    let header = document.querySelector('.header');

    this.faBars = faBars;

    if (navbar) {
      navbar.classList.remove('active');
    }
    if (window.scrollY > 0) {
      if (header) {
        header.classList.add('active');
      }
    } else {
      if (header) {
        header.classList.remove('active');
      }
    }
  }
}

  

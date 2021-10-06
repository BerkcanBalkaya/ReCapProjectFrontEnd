import { Component, OnInit } from '@angular/core';
import { faFacebookF, faInstagram, faLinkedin, faPinterest, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight, faEnvelope, faMapMarkedAlt, faPhone } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faMapMaker=faMapMarkedAlt
  faArrowRight=faArrowRight
  faPhone=faPhone
  faEnvelope=faEnvelope
  faFacebook=faFacebookF
  faTwitter=faTwitter
  faInstagram=faInstagram
  faLinkedin=faLinkedin
  faPinterest=faPinterest
  constructor() { }

  ngOnInit(): void {
  }

}

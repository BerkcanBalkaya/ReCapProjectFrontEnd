import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private toastrService:ToastrService) { }

  ngOnInit(): void {
  }

  confirmPayment(){
    this.toastrService.success("Oldu")
  }

}

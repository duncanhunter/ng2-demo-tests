import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';
import { Payment } from './payment';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  CREDIT_CARD_NUMBER_PATTERN = '^[0-9]{15,16}$';
  formTitle = 'Payment Form';
  payment = {} as Payment;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() { }

  processPayment() {
     this.paymentService.processPayment(this.payment);
  }
}


import { Component, OnInit } from '@angular/core';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  CREDIT_CARD_NUMBER_PATTERN = '^[0-9]{15,16}$';
  formTitle = 'Payment Form';
  cardNumber: number;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() { }

  processPayment() {
    return this.paymentService.processPayment(this.cardNumber);
   }
}


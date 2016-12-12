import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { creditCardValidator } from './../shared/credit-card-validator';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  paymentForm: FormGroup;
  cardDetails = { cardno: '11', name: 'adam', expiry: '07/2019' };
  submitted = false;

  formErrors = {
    'cardno': '',
    'name': '',
    'expiry': ''
  };

  validationMessages = {
    'cardno': {
      'required': 'Card number is required.',
      'invalidCardNo': 'The card number is invalid.'
    },
    'name': {
      'required': 'Name is required.',
      'minlength': 'Name must be at least 4 characters long.',
      'maxlength': 'Name cannot be more than 24 characters long.'
    },
    'expiry': {
      'required': 'Expiry is required.',
      'invalidExpiry': 'The expiry is invalid'
    }
  };

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }
  buildForm() {
    this.paymentForm = this.fb.group({
      //cardno: ['', Validators.pattern('^[0-9]{15,16}$')],
      cardno: ['', creditCardValidator()],
      name: ['', Validators.required],
      expiry: ['', Validators.required]
    });
    this.paymentForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  savePayment() {
    this.submitted = true;
    this.cardDetails = this.paymentForm.value;
    this.paymentForm.reset();
  }

  onValueChanged(data?: any) {
    this.displayValidationMessages();
  }

  displayValidationMessages() {
    if (!this.paymentForm) { return; }

    const form = this.paymentForm;

    // tslint:disable-next-line:forin
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];

        // tslint:disable-next-line:forin
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
}

export interface CardDetails {
  cardno: string;
  name: string;
  expiry: string;
}

import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Payment } from './payment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PaymentService {
  constructor(private http: Http) { }

  savePayment(payment: Payment): Observable<Payment> {
    return this.http.post(`FAKE_END_POINT`, JSON.stringify(payment))
      .map(result => result.json())
      .catch(error => Observable.throw(error));
  }

}

// import { element } from 'protractor';
// import { CardDetails } from './payment.component';
// import { async, fakeAsync, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
// import { By } from '@angular/platform-browser';
// import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
// import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
// import { creditCardValidator } from './../shared/credit-card-validator';
// import { MaterialModule } from '@angular/material';
// import { PaymentComponent } from './payment.component';
// import { PaymentService } from './payment.service';
// import { BaseRequestOptions, Http, HttpModule, XHRBackend } from '@angular/http';
// import { MockBackend } from '@angular/http/testing';


// describe('PaymentComponent', () => {
//     let component: PaymentComponent;
//     let fixture: ComponentFixture<PaymentComponent>;
//     let mockBackend: XHRBackend;
//     let paymentService: PaymentService;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             declarations: [PaymentComponent],
//             providers: [
//                 FormBuilder,
//                 PaymentService,
//                 { provide: XHRBackend, useClass: MockBackend }
//             ],
//             imports: [
//                 MaterialModule.forRoot(),
//                 ReactiveFormsModule,
//                 HttpModule
//             ]
//         });

//         fixture = TestBed.createComponent(PaymentComponent);
//         component = fixture.componentInstance;
//         paymentService = TestBed.get(PaymentService);
//         mockBackend = TestBed.get(XHRBackend);
//         TestBed.compileComponents();
//         fixture.detectChanges();
//     }));

//     // beforeEach(async(inject([PaymentService, XHRBackend],
//     //     (ps: PaymentService, mb: XHRBackend) => {
//     //         paymentService = ps;
//     //         XHRBackend = mb;
//     // })));

//     // beforeEach(async(() => {

//     //     // fixture.detectChanges();
//     // }));


//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('should update cardDetails on savePayment() ', async(() => {

//         const testCardDetails = {
//             cardno: '1234567890123456',
//             name: 'adam s',
//             expiry: '08/2019'
//         };

//         component.paymentForm.controls['cardno'].setValue(testCardDetails.cardno);
//         component.paymentForm.controls['name'].setValue(testCardDetails.name);
//         component.paymentForm.controls['expiry'].setValue(testCardDetails.expiry);
//         component.savePayment();
//         expect(true).toEqual(true);
//         expect(component.cardDetails).toEqual(testCardDetails);
//     }));
// });

// class DemoCardBuilder {
//     cardno: string;
//     name: string;
//     expiry: string;

//     build() {
//         return {
//             cardno: this.cardno,
//             name: this.name,
//             expiry: this.expiry
//         };
//     }

//     withValidDetails() {
//         this.cardno = '1234567890123456';
//         this.name = 'adam s';
//         this.expiry = '08/2019';

//         return this;
//     };

//     withBlankCardNo() {
//         this.cardno = '';
//         return this;
//     }

//     withInvalidCardNo() {
//         this.cardno = 'aa';
//         return this;
//     }

//     withBlankName() {
//         this.name = '';
//         return this;
//     }
// }



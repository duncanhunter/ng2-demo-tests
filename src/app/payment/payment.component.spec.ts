import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { Payment } from './payment';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

describe(`Component: Payment Component`, () => {
    let component: PaymentComponent,
        paymentService: any,
        fixture: ComponentFixture<PaymentComponent>;

    // beforeEach(() => {

    //     paymentService = {
    //         processPayment: () => { }
    //     };

    //     component = new PaymentComponent(paymentService);

    // });
    beforeEach(async(() => {
        paymentService = {
            processPayment: () => { }
        };

        TestBed.configureTestingModule({
            declarations: [
                PaymentComponent
            ],
            imports: [
                FormsModule,
            ],
            providers: [
                { provide: PaymentService, useValue: paymentService }
            ]
        });

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        paymentService = TestBed.get(PaymentService);

    }));


    it(`should instantiate a component`, () => {
        expect(1 + 1).toEqual(2);
    });

    it('card number containing 16 numbers should be valid', () => {
        let regex = new RegExp(component.CREDIT_CARD_NUMBER_PATTERN);
        let result = regex.test('1111222233334444');
        expect(result).toBeTruthy();
    });

    it(`should call the payment service on submit`, async(() => {
        let spy = spyOn(paymentService, 'processPayment');
        component.processPayment();
        expect(spy).toHaveBeenCalled();
    }));

    it(`should have a active submit button`, async(() => {
        component.payment.creditCardNumber = '11112222333344';
        console.log(component.payment.creditCardNumber);
        fixture.detectChanges();
        let submitButton = fixture.debugElement.query(By.css('.btn'));
        console.log(submitButton);
        const isDisabled =  submitButton.nativeElement.disabled;
        console.log(isDisabled);
        expect(isDisabled).toBeFalsy();

        		
//  -        component.paymentForm.patchValue(testCardDetails);		
//  -		
//  -        fixture.detectChanges();		
//  -        const de = fixture.debugElement.query(By.css('.paymentbutton'));		
//  -        const isDisabled = de.nativeElement.disabled;		
//  -        expect(isDisabled).toBeFalsy();

        //1 fill in the form detectChanges()
        //2 select the button 
        // expect button att toNOtBe diabled
    }));

});
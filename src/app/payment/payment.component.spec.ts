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

    it(`should have a active submit button`, () => {
        component.payment.creditCardNumber = '1111222233334444';
        fixture.detectChanges();
        let ne = fixture.debugElement.query(By.css('.btn')).nativeElement;
        return fixture.whenStable().then(() => {
            fixture.detectChanges();
            console.log(ne.disabled);
            expect(ne.disabled).toBeFalsy();
        });


    });

});
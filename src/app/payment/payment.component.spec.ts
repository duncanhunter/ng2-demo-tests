/* tslint:disable:no-unused-variable */
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { creditCardValidator } from './../shared/credit-card-validator';
import { MaterialModule } from '@angular/material';
import { PaymentComponent } from './payment.component';

describe('PaymentComponent', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentComponent],
            providers: [
                FormBuilder
            ],
            imports: [
                MaterialModule.forRoot(),
                ReactiveFormsModule
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('cardDetails should update when save called', fakeAsync(() => {

        const testCardDetails = {
            cardno: '1111222233334444',
            name: 'adam',
            expiry: '07/2019'
        };

        component.paymentForm.controls['cardno'].setValue(testCardDetails.cardno);
        component.paymentForm.controls['name'].setValue(testCardDetails.name);
        component.paymentForm.controls['expiry'].setValue(testCardDetails.expiry);
        component.savePurchase();
        expect(component.cardDetails).toEqual(testCardDetails);
    }));


    it('should give a card is required error when card number is empty', fakeAsync(() => {

        const testCardDetails = {
            cardno: '',
            name: 'adam s',
            expiry: '07/2019'
        };

        component.paymentForm.controls['cardno'].setValue(testCardDetails.cardno);
        component.paymentForm.controls['name'].setValue(testCardDetails.name);
        component.paymentForm.controls['expiry'].setValue(testCardDetails.expiry);
        fixture.detectChanges();
        tick();
        const expectedMessage = 'Card number is required.';
        expect(component.formErrors['cardno'] ).toEqual(expectedMessage);
    }));

});

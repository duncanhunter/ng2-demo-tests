import { CardDetails } from './payment.component';
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

    it('should update cardDetails on savePurchase() ', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder().withValidDetails().build();

        component.paymentForm.controls['cardno'].setValue(testCardDetails.cardno);
        component.paymentForm.controls['name'].setValue(testCardDetails.name);
        component.paymentForm.controls['expiry'].setValue(testCardDetails.expiry);
        component.savePurchase();

        expect(component.cardDetails).toEqual(testCardDetails);
    }));

    it('should give no errors when card details are valid', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder().withValidDetails().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeTruthy();
        expect(cardControl.errors).toBeFalsy();
    }));
    it('should give an required error when card number is empty', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder()
                .withValidDetails()
                .withBlankCardNo().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeFalsy();
        expect(cardControl.errors['required']).toBeTruthy();
        expect(cardControl.errors['invalidCardNo']).toBeFalsy();
    }));
    it('should give an invalidCardNo error when card number is invalid', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder()
                .withValidDetails()
                .withInvalidCardNo().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeFalsy();
        expect(cardControl.errors['required']).toBeFalsy();
        expect(cardControl.errors['invalidCardNo']).toBeTruthy();
    }));


    // it('should disable the process button if form is invalid', async() => {
    //     component.paymentForm.patchValue({
    //         cardno: 'aa',
    //         name: 'adam s',
    //         expiry: '08/2019'});
    // });

});

class DemoCardBuilder {
    cardno: string;
    name: string;
    expiry: string;

    build() {
        return {
            cardno: this.cardno,
            name: this.name,
            expiry: this.expiry
        };
    }

    withValidDetails() {
        this.cardno = '1234567890123456';
        this.name = 'adam s';
        this.expiry = '08/2019';

        return this;
    };

    withBlankCardNo() {
        this.cardno = '';
        return this;
    }

    withInvalidCardNo() {
        this.cardno = 'aa';
        return this;
    }
    withBlankName() {
        this.name = '';
        return this;
    }

}
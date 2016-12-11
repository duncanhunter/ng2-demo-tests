import { element } from 'protractor';
import { CardDetails } from './payment.component';
/* tslint:disable:no-unused-variable */
import { async, fakeAsync, ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
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

    it('should give two errors when card number is invalid and name is empty', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails()
            .withBlankName()
            .withInvalidCardNo().build();

        component.paymentForm.patchValue(testCardDetails);

        expect(component.paymentForm.valid).toBeFalsy();

        const nameControl = component.paymentForm.controls['name'];
        expect(nameControl.errors['required']).toBeTruthy();
        expect(nameControl.errors['invalidCardNo']).toBeFalsy();

        const cardControl = component.paymentForm.controls['cardno'];
        expect(cardControl.errors['required']).toBeFalsy();
        expect(cardControl.errors['invalidCardNo']).toBeTruthy();
    }));

});


describe('PaymentComponent Shallow Tests', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentComponent],
            schemas: [NO_ERRORS_SCHEMA],
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

    it('should enable the process button if form is valid', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails().build();

        component.paymentForm.patchValue(testCardDetails);

        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('.paymentbutton'));
        const isDisabled = de.nativeElement.disabled;
        expect(isDisabled).toBeFalsy();
    }));

    it('should disable the process button if form is invalid', fakeAsync(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails().withBlankName().build();

        component.paymentForm.patchValue(testCardDetails);

        const de = fixture.debugElement.query(By.css('.paymentbutton'));
        const isDisabled = de.nativeElement.disabled;
        expect(isDisabled).toBeTruthy();
    }));
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

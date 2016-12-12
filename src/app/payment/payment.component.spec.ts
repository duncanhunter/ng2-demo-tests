import { element } from 'protractor';
import { CardDetails } from './payment.component';
import { fakeAsync, async, ComponentFixture, TestBed, tick, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { creditCardValidator } from './../shared/credit-card-validator';
import { MaterialModule } from '@angular/material';
import { PaymentComponent } from './payment.component';
import { PaymentService } from './payment.service';
import { BaseRequestOptions, Http, HttpModule, XHRBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';


describe('PaymentComponent', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;
    let mockBackend: XHRBackend;
    let paymentService: PaymentService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentComponent],
            providers: [
                FormBuilder,
                PaymentService,
                { provide: XHRBackend, useClass: MockBackend }
            ],
            imports: [
                MaterialModule.forRoot(),
                ReactiveFormsModule,
                HttpModule
            ]
        });

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        paymentService = TestBed.get(PaymentService);
        mockBackend = TestBed.get(XHRBackend);
        TestBed.compileComponents();
        fixture.detectChanges();
    }));


    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should update cardDetails on savePayment() ', async(() => {

        const testCardDetails = new DemoCardBuilder().withValidDetails().build();

        component.paymentForm.controls['cardno'].setValue(testCardDetails.cardno);
        component.paymentForm.controls['name'].setValue(testCardDetails.name);
        component.paymentForm.controls['expiry'].setValue(testCardDetails.expiry);
        component.savePayment();

        expect(component.cardDetails).toEqual(testCardDetails);
    }));

    it('should give no errors when card details are valid', async(() => {

        const testCardDetails = new DemoCardBuilder().withValidDetails().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeTruthy();
        expect(cardControl.errors).toBeFalsy();
    }));
    it('should generate a required error when card number is empty', async(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails()
            .withBlankCardNo().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeFalsy();
        expect(cardControl.errors['required']).toBeTruthy();
        expect(cardControl.errors['invalidCardNo']).toBeFalsy();
    }));
    it('should generate invalidCardNo error when card number is invalid', async(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails()
            .withInvalidCardNo().build();

        component.paymentForm.patchValue(testCardDetails);

        const cardControl = component.paymentForm.controls['cardno'];
        expect(component.paymentForm.valid).toBeFalsy();
        expect(cardControl.errors['required']).toBeFalsy();
        expect(cardControl.errors['invalidCardNo']).toBeTruthy();
    }));

    it('should generate two errors when card number is invalid and name is empty', async(() => {

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


describe('PaymentComponent template tests', () => {
    let component: PaymentComponent;
    let fixture: ComponentFixture<PaymentComponent>;
    let mockBackend: XHRBackend;
    let paymentService: PaymentService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PaymentComponent],
            providers: [
                FormBuilder,
                PaymentService,
                { provide: XHRBackend, useClass: MockBackend }
            ],
            imports: [
                MaterialModule.forRoot(),
                ReactiveFormsModule,
                HttpModule
            ]
        });

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        paymentService = TestBed.get(PaymentService);
        mockBackend = TestBed.get(XHRBackend);
        TestBed.compileComponents();
        fixture.detectChanges();

    }));


    it('should enable the process button if form is valid', async(() => {

        const testCardDetails = new DemoCardBuilder()
            .withValidDetails().build();

        component.paymentForm.patchValue(testCardDetails);

        fixture.detectChanges();
        const de = fixture.debugElement.query(By.css('.paymentbutton'));
        const isDisabled = de.nativeElement.disabled;
        expect(isDisabled).toBeFalsy();
    }));

    it('should disable the process button if form is invalid', async(() => {

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

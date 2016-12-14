import { PaymentComponent } from './payment.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { By } from '@angular/platform-browser';

describe(`Component: PaymentComponent`, () => {
    let component: PaymentComponent;
    let mockPaymentService: any;
    let fixture: ComponentFixture<PaymentComponent>;

    beforeEach(() => {
        mockPaymentService = {
            processPayment: () => { }
        };

        //component = new PaymentComponent(paymentService);

        TestBed.configureTestingModule({
            declarations: [
                PaymentComponent
            ],
            imports: [
                FormsModule
            ],
            providers: [
                { provide: PaymentService, useValue: mockPaymentService }
            ]
        });

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        mockPaymentService = TestBed.get(PaymentService);
    });

    it(`should count 1 + 1`, () => {
        expect(1 + 1).toEqual(2);
    });

    it(`should have a regex patter that only accepts 15/16 numbers`, () => {
        const regex = new RegExp(component.CREDIT_CARD_NUMBER_PATTERN);
        const regexResult = regex.test('1111222233334444');
        expect(regexResult).toEqual(true);
    });

    it(`should call PaymentService.processPayment on form submission `, () => {
        let spy = spyOn(mockPaymentService, 'processPayment')
        component.payment.creditCardNumber = '1111222233334444';
        component.processPayment();
        expect(spy).toHaveBeenCalledWith(component.payment);
    });

    it(`should have a an active submit button whe the form is valid`, () => {
        component.payment.creditCardNumber = '1111222233334444';
        fixture.detectChanges();
        let nativeButtonElement = fixture.debugElement.query(By.css('button')).nativeElement;
        fixture.whenStable().then(() => {
            fixture.detectChanges();
            expect(nativeButtonElement.disabled).toEqual(false);
        });
    });

});

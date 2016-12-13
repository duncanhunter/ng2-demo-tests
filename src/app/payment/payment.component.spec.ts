import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './payment.service';
import { Http, HttpModule } from '@angular/http';
import { Payment } from './payment';

describe(`Component: Payment Component`, () => {
    let component = PaymentComponent,
        paymentService: PaymentService,
        fixture: ComponentFixture<any>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                PaymentComponent
            ],
            imports: [
                FormsModule,
            ],
            providers: [
                { provide: PaymentService, useValue: {} as any }
            ]
        });

        fixture = TestBed.createComponent(PaymentComponent);
        component = fixture.componentInstance;
        paymentService = TestBed.get(PaymentService);

    }));


    it(`should instantiate a component`, () => {
        expect(component).toBeTruthy();
    });

});




    // it('card number containing 16 numbers should be valid', () => {
    //     let expression = new RegExp(CREDIT_CARD_NUMBER_PATTERN);
    //     let result = expression.test('1234567890123456');
    //     expect(result).toBeTruthy();
    // });
    // it('card number containing letter should not be valid', () => {
    //     let expression = new RegExp(CREDIT_CARD_NUMBER_PATTERN);
    //     let result = expression.test('12345678901234aa');
    //     expect(result).toBeFalsy();
    // });
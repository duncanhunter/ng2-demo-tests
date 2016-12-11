import { creditCardValidator } from './credit-card-validator';
import { AbstractControl, FormBuilder} from '@angular/forms';

describe('credit card number validator', () => {
    let getControl = (valueToTest: string) : AbstractControl => {
        let fb = new FormBuilder();
        let paymentForm = fb.group({
            cardNumber: [valueToTest, creditCardValidator()]
        });
        return paymentForm.get('cardNumber') as AbstractControl;
    };

    it('should be valid for card number containing 15 numbers', () => {
        let control = getControl('123456789012345');
        let isControlValid = control.valid;
        expect(isControlValid).toBeTruthy();
    });

    it('should be invalid for card number containing letters', () => {
        let control = getControl('a234567890123456');
        let isControlValid = control.valid;
        expect(isControlValid).toBeFalsy();
    });

    it('should be invalid for empty card numbers', () => {
        let control = getControl('');
        let isControlValid = control && control.valid;
        expect(isControlValid).toBeFalsy();
    });

    it('should return "required" error for empty card number', () => {
        let control = getControl('');
        let requiredErrorMessage = control.errors['required'];
        expect(requiredErrorMessage).toBeTruthy();
    });

});



import { CREDIT_CARD_NUMBER_PATTERN } from './regex';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const controlValue = control.value;
        if ( controlValue === '') {
            return { 'required': { controlValue }};
        }

        let expression = new RegExp(CREDIT_CARD_NUMBER_PATTERN);
        const valid = expression.test(controlValue);
        return valid ? null : { 'invalidCardNo': { controlValue } };
    };
}

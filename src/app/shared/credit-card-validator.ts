import { CREDIT_CARD_NUMBER_PATTERN } from './regex';
import { ValidatorFn, AbstractControl } from '@angular/forms';

export function creditCardValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        let expression = new RegExp(CREDIT_CARD_NUMBER_PATTERN);
        const controlValue = control.value;
        const valid = expression.test(controlValue);
        return valid ? null : { 'invalidCardNo': { controlValue } };
    };
}

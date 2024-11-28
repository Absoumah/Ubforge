import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dueDateValidator(reportedDateControl: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value || !reportedDateControl.value) return null;

        const reportedDate = new Date(reportedDateControl.value);
        const dueDate = new Date(control.value);

        return dueDate < reportedDate ? { dueDateInvalid: true } : null;
    };
}
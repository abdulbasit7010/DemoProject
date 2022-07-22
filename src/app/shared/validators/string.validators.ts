import { AbstractControl, ValidationErrors } from "@angular/forms"

export class StringValidator {
    static noAllSpaces(control: AbstractControl): ValidationErrors | null {
        try {
            if (!!control.value && typeof control.value == 'string') {
                if (control.value.length > 0 && control.value.trim().length === 0) {
                    return { noAllSpaces: true }
                }
            }
            return null
        } catch (error) {
            return null
        }
    }
}
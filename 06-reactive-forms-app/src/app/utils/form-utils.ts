import { FormArray, FormGroup, ValidationErrors } from "@angular/forms";

export class FormUtils{
    static isValidField( form: FormGroup ,fieldName: string ): boolean {

        return (
        !!form.controls[fieldName].errors &&
        form.controls[fieldName].touched
        );
    }

    static getFieldError( form: FormGroup, fieldName: string ): string | null {
        if( !form.controls[fieldName] ) return null;
        const errors = form.controls[fieldName].errors ?? {};

        return FormUtils.getErrorMsg(errors);
    }

    static isValidFieldInArray(formArray: FormArray, index:number){
        return (
        formArray.controls[index].errors &&
        formArray.controls[index].touched
        )

    }

    static getFieldErrorInArray(formArray: FormArray, index: number){
        if( formArray.controls.length === 0) return null;

        const errors = formArray.controls[index].errors ?? {};
        return FormUtils.getErrorMsg(errors);
    }   

    private static getErrorMsg(errors: ValidationErrors): string | null{
        for(const key of Object.keys(errors)){
            switch(key){
                case 'required':
                return 'Este campo es requerido';
                case 'minlength':
                    return `Mínimo de ${errors['minlength'].requiredLength} caracteres`
                case 'min':
                    return `Valor mínimo de ${errors['min'].min}`;
            }
        }

        return null;
    }
    
}
import { AbstractControl, FormArray, FormGroup, ValidationErrors } from "@angular/forms";

async function sleep(){
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(true)
        }, 2500)
    })
}

export class FormUtils{
    static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
    static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
    static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';


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

    static areFieldsValuesEquals( firstFieldName: string, secondFieldName: string){
        return ( formGroup: AbstractControl ) => {
        const firstField = formGroup.get(firstFieldName)?.value;
        const secondField = formGroup.get(secondFieldName)?.value;


        return firstField === secondField ? null : {
            passwordsNotEquals: true
        }
        }
    }

    static async checkinServerResponse(control:AbstractControl):Promise<ValidationErrors | null >{
        await sleep();

        const formValue = control.value;

        if(formValue === 'hola@mundo.com'){
            return {
                emailTaken: true
            }
        }
        return null;
    }

    static notStrider(control: AbstractControl): ValidationErrors | null{
        const formValue = control.value;
        if(formValue.toLowerCase() === 'strider'){

            return{
                notStrider: true
            }
        }
        return null;
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
                    case 'email':
                        return 'El correo electrónico no tiene el formato requerido';
                case 'pattern':
                    if( errors['pattern'].requiredPattern === FormUtils.emailPattern){
                        return 'El correo electrónico no es permitido'
                    }
                    return 'Error de patron';
                case 'emailTaken':
                    return 'Este correo ya ha sido registrado';
                case 'notStrider':
                    return 'Nombre de usuario no permitido';
                default:
                    return `Error de validacion no contralado ${key}`
            }
        }

        return null;
    }
    
}
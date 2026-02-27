import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'gender'
})
export class ProductGenderPipe implements PipeTransform{
    transform(value: string):string {
        switch(value){
            case 'men':
                return 'Hombres';
            case 'women':
                return 'Mujeres';
            case 'kids':
                return 'Niños';
            default: return 'Todos';
        }
    }

}
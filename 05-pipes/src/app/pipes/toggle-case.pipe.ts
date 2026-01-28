import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'toggleCase'
})
export class ToggleCasePipe implements PipeTransform {
    transform(value: string, toUpperCase = false ) :string {

        return toUpperCase ? value.toUpperCase() : value;
    }
}
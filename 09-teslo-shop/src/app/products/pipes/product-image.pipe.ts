import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment.development';

const baseUrl = environment.baseUrl;

@Pipe({
  name: 'productImage',
})
export class ProductImagePipe implements PipeTransform {
  private imgUrl = `${baseUrl}/files/product`;
  transform(value: string | string[]): string {
    if(typeof value === 'string'){
      return `${this.imgUrl}/${value}`;
    }

    if(value.length > 0){

      return `${this.imgUrl}/${value[0]}`;
    }


    return 'assets/imgs/no-image.jpg';
  }

}

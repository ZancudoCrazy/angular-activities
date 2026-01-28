import { Pipe, type PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform {
 
  transform(heros: Hero[], sortBy: keyof Hero | null): Hero[] {
    
    switch(sortBy){
      case 'name':
        return heros.sort((a, b) => a.name.localeCompare(b.name));
      case 'canFly':
        return heros.sort((a, b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1 ));
      case 'color':
        return heros.sort((a, b) => a.color - b.color);
      case 'creator':
        return heros.sort((a, b) => a.color - b.color);
      default:  
        return heros;
    }

  }

}

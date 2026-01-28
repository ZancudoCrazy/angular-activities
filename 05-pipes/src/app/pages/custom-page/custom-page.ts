import { Component, signal } from '@angular/core';
import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { Hero } from '../../interfaces/hero.interface';
import { heroes } from '../../data/heros.data';
import { CanFlyPipe } from '../../pipes/can-fly.pipe';
import { HeroColorPipe } from '../../pipes/hero-color.pipe';
import { TitleCasePipe } from '@angular/common';
import { HeroCreatorPipe } from '../../pipes/hero-creator.pipe';
import { HeroSortByPipe } from '../../pipes/hero-sort-by.pipe';
import { HeroFilterPipe } from '../../pipes/hero-filter.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ 
    ToggleCasePipe,
    CanFlyPipe,
    HeroColorPipe,
    TitleCasePipe,
    HeroCreatorPipe,
    HeroSortByPipe,
    HeroFilterPipe,
   ],
  templateUrl: './custom-page.html',
})
export default class CustomPage { 
  name = signal('Adrian Sanchez');

  upperCase = signal(true);
  sortBy = signal<keyof Hero | null>(null);
  heros = signal<Hero[]>(heroes);
  searchQuery = signal('');

  changePipe(){
    this.upperCase.update(current => !current );
  }
}

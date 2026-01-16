import { Component, input, output } from '@angular/core';

@Component({
  selector: 'country-search',
  imports: [],
  templateUrl: './country-search.html',
})
export class ContrySearch { 
  value = output<string>();
  placeholder = input<string>('Buscar');
}

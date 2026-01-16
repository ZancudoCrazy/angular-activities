import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CountryInterface } from '../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'country-details',
  imports: [DecimalPipe],
  templateUrl: './country-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryDetails {
  country = input.required<CountryInterface>();
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-country-info',
  imports: [],
  templateUrl: './country-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInfo { }

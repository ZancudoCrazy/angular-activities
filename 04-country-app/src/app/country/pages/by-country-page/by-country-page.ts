import { ChangeDetectionStrategy, Component, inject, resource, signal, Signal, WritableSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ContrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map, of } from 'rxjs';
import { Country } from '../../services/country';

@Component({
  selector: 'app-by-country-page',
  imports: [ContrySearch, CountryList],
  templateUrl: './by-country-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPage {
  countryService  = inject(Country);
  country = signal('');

  countryResource = rxResource({
    params : (  ) => ({query: this.country()}),
    stream: ({params}) => {
      if(!this.country() ) return of([]);

      return this.countryService.searchByCountry( params.query ) 
    } 
  })

}

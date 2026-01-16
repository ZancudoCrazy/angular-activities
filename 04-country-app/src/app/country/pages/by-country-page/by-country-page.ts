import { ChangeDetectionStrategy, Component, inject, resource, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ContrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";
import { ActivatedRoute } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
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

  countryResource = resource({
    params : (  ) => ({query: this.country()}),
    loader: async ({params}) => {
      if(!this.country() ) return;

      return await firstValueFrom( this.countryService.searchByCountry( params.query ) )
    } 
  })

}

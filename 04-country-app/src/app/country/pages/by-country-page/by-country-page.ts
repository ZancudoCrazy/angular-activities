import { ChangeDetectionStrategy, Component, inject, linkedSignal, resource, signal, Signal, WritableSignal } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ContrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";
import { ActivatedRoute, Router } from '@angular/router';
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
  
  activedRoute = inject(ActivatedRoute);
  route = inject(Router);
  
  queryParam = this.activedRoute.snapshot.queryParamMap.get('query') ?? '';
  country = linkedSignal(() => this.queryParam);
  
  countryResource = rxResource({
    params : (  ) => ({query: this.country()}),
    stream: ({params}) => {
      if(!this.country() ) return of([]);

      this.route.navigate(['/country/by-country'],{
        queryParams:{
          query: params.query
        }
      });
      
      return this.countryService.searchByCountry( params.query ) 
    } 
  })

}

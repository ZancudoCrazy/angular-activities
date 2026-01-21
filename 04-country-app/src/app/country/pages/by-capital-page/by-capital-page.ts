import { Component, inject, resource, signal } from '@angular/core';
import { CountryList } from "../../components/country-list/country-list";
import { ContrySearch } from "../../components/country-search/country-search";
import { Country } from '../../services/country';
import { CountryMapper } from '../../mappers/country.mapper';
import { CountryInterface } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-by-capital-page',
  imports: [CountryList, ContrySearch],
  templateUrl: './by-capital-page.html'
})
export class ByCapitalPage {
  countrySerivce = inject(Country);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
  query = signal(this.queryParam);


  countryResource = rxResource({
    params: () => ({ query: this.query() }),
    
    stream : ({ params }) => {
      if( !this.query() ) return of([]);
      
      this.router.navigate(['/country/by-capital'], {
        queryParams: {
          query: params.query
        }
      });

      return this.countrySerivce.searchByCapital( params.query )
    },
    
  });
  // countryResource = resource({
  //   params: () => ({ query: this.query() }),
    
  //   loader: async({ params }) => {
  //     if( !this.query() ) return [];
      

  //     return await firstValueFrom(
  //        this.countrySerivce.searchByCapital( params.query )
  //     );
  //   }
    
  // });
  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<CountryInterface[]>([]);

  // onSearch(value:string):void{
  //   if(this.isLoading()) return;
  //   this.isLoading.set(true);
  //   this.isError.set(null);

  //   this.countrySerivce.searchByCapital(value)
  //     .subscribe({
  //       next: (countries) => {
  //         this.isLoading.set(false);
  //         this.countries.set(countries);
  //         this.isError.set(null);
  //       },
  //       error: (err ) => {
  //         this.isLoading.set(false);
  //         this.countries.set([]);
  //         this.isError.set(err);
  //       }
  //     })
  // }
 }

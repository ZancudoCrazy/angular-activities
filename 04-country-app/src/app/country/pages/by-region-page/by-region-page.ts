import { Component, inject, linkedSignal, signal } from '@angular/core';
import { ContrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";
import { Region } from '../../interfaces/region';
import { CountryInterface } from '../../interfaces/country.interface';
import { Country } from '../../services/country';
import { ActivatedRoute, Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  imports: [ CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage {
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  countryService = inject(Country);
  
  queryParam  = this.activatedRoute.snapshot.queryParamMap.get('region') ?? '';
  selectedRegion = linkedSignal<Region|null>( () => this.stringToRegion(this.queryParam) );

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia', 
    'Europe',
    'Oceania',
    'Antarctic',
  ];

  countryResource = rxResource({
    params: () => ({ region: this.selectedRegion() }),
    stream: ({ params }) => {
      console.log(params)
      if(!params.region) return of([]);
      
      const region:Region = this.stringToRegion(params.region);
      this.selectedRegion.set(region);

      this.router.navigate(['country/by-region'],{
        queryParams: {
          region: params.region
        }
      });
      return this.countryService.searchCountryByRegion(region);
    }

  })
  // search(region: Region){
  //   this.selectedRegion.set(region);
  //   this.router.navigate(['country/by-region'],{
  //     queryParams: {
  //       region
  //     }
  //   });
  //   this.countryService.searchCountryByRegion(region)
  //     .subscribe( this.countries.set);
  // }

  private stringToRegion(strRegion:string ): Region {
    console.log(strRegion);
    return this.regions.filter((region) => region === strRegion)[0] || 'Americas';

  }

} 

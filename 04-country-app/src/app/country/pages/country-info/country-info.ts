import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Country } from '../../services/country';
import { ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { NotFound } from "../../components/not-found/not-found";
import { CountryDetails } from "./country-details/country-details";

@Component({
  selector: 'app-country-info',
  imports: [NotFound, CountryDetails],
  templateUrl: './country-info.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInfo { 
  countryCode = inject(ActivatedRoute)
    .snapshot.params['code'];
  
  countryService = inject(Country);
  countryResource = rxResource({
      params: (  ) => ({code: this.countryCode}),
      stream: ({params}) => {
        return this.countryService.searchCountryByAlfaCode(params.code);
      },
  });
}

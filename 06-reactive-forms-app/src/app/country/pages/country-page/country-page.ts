import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CountryService } from '../../services/country.service';
import { JsonPipe } from '@angular/common';
import { Country } from '../../interfaces/country.interface';
import { filter, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-country-page',
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './country-page.html',
})
export class CountryPage {
  formBuilder = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions)
  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.formBuilder.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required]
  });

  onFormChange = effect( ( onCleanup) => {
    const regionSuscription = this.onRegionChange();
    const countrySuscription = this.onCountryChange();

      onCleanup(() => {
        regionSuscription.unsubscribe();
        countrySuscription.unsubscribe();
      })
  });

  onRegionChange () {

    return this.myForm.get('region')!.valueChanges
      .pipe(
        tap(() => this.myForm.get('country')!.setValue('')),
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => {
          this.borders.set([]);
          this.countriesByRegion.set([]);
        }),
        switchMap( region =>  this.countryService.getCountriesByRegion(region ?? ''))
      )
      .subscribe( (countries) => {
        this.countriesByRegion.set(countries);
      })
  }

  onCountryChange(){
    return this.myForm
      .get('country')!
      .valueChanges
      .pipe(
        tap(() => this.myForm.get('border')!.setValue('')),
        tap(() => this.borders.set([])),
        filter( value => value!.length > 0),
        switchMap( (alphaCode) => this.countryService.getCountryByAlphaCode(alphaCode ?? '') ),
        switchMap( country => this.countryService.getCountryNamesByCodes(country.borders))
      )
      .subscribe( (borders) => {
        this.borders.set(borders)
      })
  }

}

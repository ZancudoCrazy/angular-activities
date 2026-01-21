import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, pipe, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { CountryInterface } from '../interfaces/country.interface';
import { Region } from '../interfaces/region';

const API_URL = 'https://restcountries.com/v3.1'
@Injectable({
  providedIn: 'root'
})
export class Country {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string,CountryInterface[]>();
  private queryCacheCountry = new Map<string,CountryInterface[]>();
  private regionCacheCountry = new Map<Region, CountryInterface[]>();

  searchByCapital( query: string): Observable<CountryInterface[]>{
    query = query.toLocaleLowerCase();

    if( this.queryCacheCapital.has(query) ) return of(this.queryCacheCapital.get(query) ?? [] );

    return this.http
      .get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map( CountryMapper.countryArrMapper ),
        tap( countries => this.queryCacheCapital.set(query, countries) ),
        catchError(error => {
          return throwError(() => `No se pudo obtener países con ese query ${query}`);
        })
      );
  }

  searchByCountry(query: string): Observable<CountryInterface[]> {
    query = query.toLocaleLowerCase();

    if(this.queryCacheCountry.has(query)) return of(this.queryCacheCountry.get(query) ?? []);
    console.log('sending request...')
    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(CountryMapper.countryArrMapper),
        tap( countries => this.queryCacheCountry.set(query, countries)),
        //delay(3000),
        catchError( err => {
          return throwError( ()  => `No hay coincidencias para el país ${query}`)
        })
      )
  }
  
  searchCountryByAlfaCode(code: string) {
    return this.http
      .get<RESTCountry[]>(`${API_URL}/alpha/${code}`)
      .pipe(
        map(CountryMapper.countryArrMapper),
        map( countries => countries.at(0)),
        catchError( err => {
          return throwError( ()  => `No hay coincidencias para el país ${code}`)
        })
      )
  }

  searchCountryByRegion(region: Region): Observable<CountryInterface[]>{
    const url = `${API_URL}/region/${region}`;
    if(this.regionCacheCountry.has(region))
      return of(this.regionCacheCountry.get(region) ?? []);
    console.log(`Searchin countrys: ${url}`)
    return this.http  
      .get<RESTCountry[]>(url)
      .pipe(
        map(CountryMapper.countryArrMapper),
        tap(countries => this.regionCacheCountry.set(region, countries)),
        catchError( err => 
          {
            return throwError(() => `No se encontraron coincidencias para la region ${region}`) 
          }
        )
      )
  }

}

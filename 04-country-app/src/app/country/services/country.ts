import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-country.interfaces';
import { map, Observable, catchError, throwError, pipe } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { CountryInterface } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1'
@Injectable({
  providedIn: 'root'
})
export class Country {
  private http = inject(HttpClient);

  searchByCapital( query: string): Observable<CountryInterface[]>{
    query = query.toLocaleLowerCase();

    return this.http
      .get<RESTCountry[]>(`${ API_URL }/capital/${ query }`)
      .pipe(
        map( CountryMapper.countryArrMapper ),
        catchError(error => {
          return throwError(() => `No se pudo obtener países con ese query ${query}`);
        })
      );
  }

  searchByCountry(query: string): Observable<CountryInterface[]> {
    query = query.toLocaleLowerCase();
    return this.http
      .get<RESTCountry[]>(`${API_URL}/name/${query}`)
      .pipe(
        map(res => {
          console.log(res)
          return CountryMapper.countryArrMapper(res);
        }),
        catchError( err => {
          return throwError( ()  => `No hay coincidencias para el país ${query}`)
        })
      )
  }

}

import { CountryInterface } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-country.interfaces";

export class CountryMapper{
    static countryMapper(restCountry: RESTCountry): CountryInterface{
        const lan = 'spa';
        return {
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.translations[lan].common,
            capital: restCountry.capital.join(','),
            population: restCountry.population,
        };
    }

    static countryArrMapper(restCountries: RESTCountry[]): CountryInterface[]{
        return restCountries.map( CountryMapper.countryMapper );
    }
}
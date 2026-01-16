import { Component } from '@angular/core';
import { ContrySearch } from "../../components/country-search/country-search";
import { CountryList } from "../../components/country-list/country-list";

@Component({
  selector: 'app-by-region-page',
  imports: [ CountryList],
  templateUrl: './by-region-page.html',
})
export class ByRegionPage { }

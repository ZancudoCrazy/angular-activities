import { Routes } from "@angular/router";
import { ByCapitalPage } from "./pages/by-capital-page/by-capital-page";
import { CountryLayout } from "./layous/country-layout/country-layout";
import { ByCountryPage } from "./pages/by-country-page/by-country-page";
import { ByRegionPage } from "./pages/by-region-page/by-region-page";
import { CountryInfo } from "./pages/country-info/country-info";

const countryRoutes: Routes = [
    {
        path: '',
        component: CountryLayout,
        children:[
            {
                path: 'by-capital',
                component: ByCapitalPage
            },
            {
                path: 'by-country',
                component: ByCountryPage
            },
            {
                path: 'by-region',
                component: ByRegionPage
            },
            {
                path: 'by/:code',
                component: CountryInfo
            },
            {
                path: '**',
                redirectTo: 'by-capital'
            }
        ],
    }
];

export default countryRoutes;
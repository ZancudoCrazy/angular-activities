import { Routes } from '@angular/router';
import { LoginViewComponent } from './login/login-view';

export const routes: Routes = [
    {
        path: '',
        component: LoginViewComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

import { Routes } from '@angular/router';
import { LoginViewComponent } from './login/login-view';

export const routes: Routes = [
    {
        path: '',
        component: LoginViewComponent
    },
    {
        path: 'system',
        loadComponent: () => import('./system/template/template-view'),
        children: [
            {
                path: 'home',
                loadComponent: () => import('./system/home/home-view')
            },
            {
                path: 'settings',
                loadComponent: () => import('./system/settings/settings')
            },
            {
                path: '**',
                redirectTo: 'home'
            }
        ]
    },
    {
        path: 'sign-up',
        loadComponent: () => import('./sign-up/sign-up-template/sign-up-template'),
        children: [
            {
                path: 'account',
                loadComponent: () => import('./sign-up/account-information/account-information')
            },
            {
                path: 'contact',
                loadComponent: () => import('./sign-up/contact-information/contact-information')
            },
            {
                path: '**',
                redirectTo: 'account'
            }
        ]

    },
    {
        path: '**',
        redirectTo: ''
    }
];

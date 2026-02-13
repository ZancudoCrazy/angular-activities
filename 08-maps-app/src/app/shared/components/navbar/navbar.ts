import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { routes } from '../../../app.routes';
import { filter, map, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, AsyncPipe],
  templateUrl: './navbar.html',
})
export class Navbar {
  router = inject(Router);

  routes = routes
    .filter( route => route.path != '**')
    .map( route => ({
      path: route.path,
      title: `${route.title ?? 'Maps en Angular'}`
    }))

  pageTitle$ = this.router.events.pipe(
    filter( event => event instanceof NavigationEnd ),
    // tap( (event ) => console.log(event))
    map(event => event.url),
    map(url => routes.find( route => `/${route.path}` === url)!.title ?? 'Maps')
  )
}
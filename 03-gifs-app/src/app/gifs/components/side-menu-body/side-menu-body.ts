import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption{
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [ RouterLink, RouterLinkActive],
  templateUrl: './side-menu-body.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuBody {
  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: 'trending',
      icon: 'fa-solid fa-chart-line'
    },
    {
      label: 'Buscardor',
      subLabel: 'Busca tus Gifs',
      route: 'search',
      icon: 'fa-solid fa-magnifying-glass'
    },
  ];
}

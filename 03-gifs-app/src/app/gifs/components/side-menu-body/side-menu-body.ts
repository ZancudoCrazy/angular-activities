import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { GifsService } from '../../services/gifs.service';

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
  gifsService = inject(GifsService);
  
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

import { Component } from '@angular/core';
import { SideMenuHeader } from "../side-menu-header/side-menu-header";
import { SideMenuBody } from "../side-menu-body/side-menu-body";

@Component({
  selector: 'gifs-side-menu',
  imports: [SideMenuHeader, SideMenuBody],
  templateUrl: './side-menu.html',
})
export class SideMenu { }

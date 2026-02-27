import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FrontNavar } from "../../components/front-navar/front-navar";

@Component({
  selector: 'app-store-front-layout',
  imports: [RouterOutlet, FrontNavar],
  templateUrl: './store-front-layout.html',
})
export class StoreFrontLayout { }

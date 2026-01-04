import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Navbar } from "./components/navbar/navbar";

@Component({
    selector: 'system-template-view',
    templateUrl: './template-view.html',
    imports: [RouterOutlet, Navbar],

})
export default class TemplateView {

}
import { Component, input } from '@angular/core';
import { GifItem } from "../gif-item/gif-item";
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'gif-list',
  imports: [GifItem],
  templateUrl: './gif-list.html',
})
export class GifList { 
  gifs= input.required<Gif[]>();
}

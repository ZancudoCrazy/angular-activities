import { Component, inject, signal } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../interfaces/gif.interface';

@Component({
  selector: 'app-search',
  imports: [GifList],
  templateUrl: './search.html',
})
export default class Search {
  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(query:string){
    this.gifsService.searchGifs(query)
      .subscribe( (payload) => {
        this.gifs.set(payload);
      });
  }

}

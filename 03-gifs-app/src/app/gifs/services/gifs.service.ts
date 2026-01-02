import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";


@Injectable({  providedIn: 'root' })
export class GifsService {
    private http = inject(HttpClient);

    trendingGifs =  signal<Gif[]>([]);

    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
                rating: 'g'
            }
        }).subscribe( ( payload ) => {
           const gifs = GifMapper.mapGiphyItemsToGifArray(payload.data);
           this.trendingGifs.set(gifs);
           console.log({gifs})
        } );
    }
}
import { HttpClient } from "@angular/common/http";
import { computed, inject, Injectable, signal, effect } from "@angular/core";
import { environment } from "@environments/environment";
import type { GiphyResponse } from "../interfaces/giphy.interface";
import { Gif } from "../interfaces/gif.interface";
import { GifMapper } from "../mapper/gif.mapper";
import { map, Observable, tap } from "rxjs";

const loadHistory = (): Record<string, Gif[]> => {
    const history = localStorage.getItem('searchHistory');
    return history ? JSON.parse(history) : {};
}

@Injectable({  providedIn: 'root' })
export class GifsService {
    private http = inject(HttpClient);
    trendingGifs =  signal<Gif[]>([]);
    trendingGifLoading = signal<boolean>(true)
    
    searchHistory = signal<Record<string, Gif[]>>(loadHistory());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));    

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
           this.trendingGifLoading.set(false);
           console.log({gifs})
        } );
    }

    searchGifs(query: string): Observable<Gif[]>{
        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`,{
            params:{
                api_key: environment.giphyApiKey,
                q: query,
                limit: '20',
                rating: 'g'
            }
        }).pipe(
            map( ({ data }) => GifMapper.mapGiphyItemsToGifArray(data) ), 
            tap( items => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLowerCase()]: items
                }))
            })
        );

        //TODO: history
        // .subscribe( (payload => {
        //     const gifs = GifMapper.mapGiphyItemsToGifArray(payload.data);
        //     console.log({gifs});
        // }))
    }

    getHistoryGifs( query:string):Gif[]{
        return this.searchHistory()[query] ?? [];
    }

    saveHistory = effect( () => {
        localStorage.setItem('searchHistory', JSON.stringify(this.searchHistory()));
    })
}
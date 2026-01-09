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
    private trendingPage = signal<number>(0);
    trendingGifLoading = signal<boolean>(false)
    trendingGifs =  signal<Gif[]>([]);
    trendingGifGroup = computed<Gif[][]>( () => {
        const groups = [];
        for(let i = 0; i < this.trendingGifs().length; i+= 3){
            groups.push( this.trendingGifs().slice(i, i + 3));

        }

        return groups;
    });

    searchHistory = signal<Record<string, Gif[]>>(loadHistory());
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));    

    constructor(){
        this.loadTrendingGifs();
    }

    loadTrendingGifs() {
        if(this.trendingGifLoading()) return;

        this.trendingGifLoading.set(true);

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: '20',
                offset: this.trendingPage() * 20
            }
        }).subscribe( ( payload ) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(payload.data);
            this.trendingGifs.update( currentGifs => [
                ...currentGifs,
                ...gifs
            ]);
           this.trendingGifLoading.set(false);
           this.trendingPage.update( current => current + 1);
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
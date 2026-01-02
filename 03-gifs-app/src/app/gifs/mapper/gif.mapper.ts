import { Gif } from "../interfaces/gif.interface";
import { GiphyGifItem } from "../interfaces/giphy.interface";


export class GifMapper{
    static mapGiphyItemToGif( item: GiphyGifItem ): Gif {
        return {
            id: item.id,
            title: item.title,
            url: item.images.fixed_height.url
        };
    }

    static mapGiphyItemsToGifArray(items:GiphyGifItem[]):Gif[]{
        return items.map(this.mapGiphyItemToGif)
    }
}
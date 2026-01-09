import { AfterViewInit, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import { GifList } from "../../components/gif-list/gif-list";
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from '../../shared/services/scroll-state';


@Component({
  selector: 'app-trending',
  // imports: [GifList],
  templateUrl: './trending.html',
})
export default class Trending implements AfterViewInit {
  
  scrollDivRef= viewChild<ElementRef<HTMLDivElement>>('groupDiv');
  gifService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);
  
  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  } 
  onScroll(event:Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if( !scrollDiv ) return;

    const { scrollTop, clientHeight, scrollHeight } = scrollDiv;

    // console.log({scrollTop, clientHeight, scrollHeight})
    const isAtBottom = scrollTop + clientHeight + 200 >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);
    // console.log({isAtBottom})
    if(isAtBottom){
      this.gifService.loadTrendingGifs();
    }
  }

}

import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'gif-item',
  imports: [],
  templateUrl: './gif-item.html'
})
export class GifItem {
  url = input.required<string>();
}

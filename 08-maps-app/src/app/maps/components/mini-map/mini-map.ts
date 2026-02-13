import { JsonPipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, input, signal, viewChild } from '@angular/core';

import mapboxgl from 'mapbox-gl'


/**
 * width 100%
 * height 260
 * lnglat 
 */
interface Coordinates {
  lng: number;
  lat: number;
}
@Component({
  selector: 'app-mini-map',
  imports: [JsonPipe],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<Coordinates>();
  
  async ngAfterViewInit(){
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;
    const { lat, lng } = this.lngLat();

    await new Promise( (resolve) => setTimeout(resolve, 80));
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: 12,
      interactive: false
    });

    map.addControl(new mapboxgl.GeolocateControl)
    map.addControl(new mapboxgl.NavigationControl)
    map.addControl(new mapboxgl.ScaleControl)
    
    new mapboxgl.Marker({
      color: '',
      draggable: false
    }).setLngLat(this.lngLat())
      .addTo(map);
 
  }

}

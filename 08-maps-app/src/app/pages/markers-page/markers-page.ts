import { AfterViewInit, Component, ElementRef, signal, viewChild } from '@angular/core';
import { v4 as UUIDV4 } from 'uuid';
import { environment } from '../../../environments/environment.development';

import mapboxgl, { LngLat, LngLatLike } from 'mapbox-gl'
import { JsonPipe } from '@angular/common';

mapboxgl.accessToken = environment.mapBoxkey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-markers-page',
  imports: [ JsonPipe ],
  templateUrl: './markers-page.html',
})
export class MarkersPage implements AfterViewInit {
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>( null);
  markers = signal<Marker[]>([]);

  async ngAfterViewInit() {
    if(!this.divElement()?.nativeElement) return;
    const element = this.divElement()!.nativeElement;

    await new Promise( (resolve) => setTimeout(resolve, 80));
    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [5.322833,60.387343], // starting position [lng, lat]
      zoom: 14, // starting zoom
    });

    // const marker = new mapboxgl.Marker({
    //     draggable: false,
    //     color: 'green'
    //   })
    //   .setLngLat([5.322833,60.387343])
    //   .addTo(map)

    this.mapListener(map)
  }

  mapListener(map: mapboxgl.Map){
    map.on('click', ( event ) => {
      this.mapClick(event);
    })

    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){

    if( !this.map() ) return;
    const map = this.map()!;

    const { lngLat } = event;
    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );

    const marker = new mapboxgl.Marker({
      draggable: false,
      color
    }).setLngLat(lngLat)
    .addTo(map);

    const newMarker: Marker = {
      id: UUIDV4(),
      mapboxMarker: marker
    }
    this.markers.update( current => [...current, newMarker ])
  }

  flyToMarker( lngLat: LngLatLike ){
    if(!this.map() ) return;

    this.map()?.flyTo({
      center: lngLat
    })
  }

  deleteMarker( marker: Marker){
    if(!this.map() ) return;

    const map = this.map()!;

    marker.mapboxMarker.remove()
    const newMarkersList = this.markers().filter( current => current.id != marker.id );

    this.markers.set( newMarkersList );
  }
}

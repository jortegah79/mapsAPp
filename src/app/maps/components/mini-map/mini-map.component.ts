import { AfterViewInit, Component, Input, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';



@Component({
  selector: 'map-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements AfterViewInit{
  @Input()  latLng?:[number,number];
  @ViewChild('map')divMap?:ElementRef;

  options:L.MapOptions={
    attributionControl:false,
    doubleClickZoom:false,
    center:this.latLng,
    zoomControl:false,
    fadeAnimation:true,
    zoomAnimation:true,
    scrollWheelZoom:false,
    dragging:false

  };
 optionsMarker: L.MarkerOptions = {
    icon: new L.DivIcon({ html: `<div style='color:orange;font-size:30px;text-shadow:4px 4px 3px black'><b>X</b></div>` }),
    interactive:false
  }

  ngAfterViewInit(): void {
    if(!this.divMap?.nativeElement)throw "Map is not defined"
    if(!this.latLng)throw "latLng can't be null"
    let map=L.map(this.divMap.nativeElement,this.options).setView(this.latLng,16);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', ).addTo(map);
    L.marker(this.latLng, this.optionsMarker).addTo(map);

  }

}

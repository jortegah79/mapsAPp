import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  templateUrl: './full-screen-page.component.html',
  styleUrls: ['./full-screen-page.component.css']
})
export class FullScreenPageComponent implements AfterViewInit {


  @ViewChild('map') divMap?:ElementRef;

  options:L.MapOptions={
    attributionControl:false,
    doubleClickZoom:false,
    center:[41.3181411, 2.0154439],
    zoomControl:false,
    minZoom:3,
    maxZoom:25,
    fadeAnimation:true,
    zoomAnimation:true,
    scrollWheelZoom:false,
  };

  ngAfterViewInit(): void {
    if(!this.divMap)throw "El elemento html no puede ser nulo";

    let map=L.map(this.divMap.nativeElement,this.options).setView([41.3181411, 2.0154439],16);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', ).addTo(map);
  }




}

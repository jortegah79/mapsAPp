import { AfterViewInit, Component, ElementRef,  OnDestroy,  ViewChild } from '@angular/core';
import * as L from 'leaflet';

@Component({
  templateUrl: './zoom-range.component.html',
  styleUrls: ['./zoom-range.component.css']
})
export class ZoomRangeComponent implements AfterViewInit,OnDestroy {
  ngOnDestroy(): void {
    this.map?.remove();
  }


  @ViewChild('map') mapDiv?: ElementRef;

  public zoom: number = 10;
  public map?: L.Map;
  public currentLatLng:L.LatLng=new L.LatLng(41.3181411, 2.0154439);


  options: L.MapOptions = {
    attributionControl: false,
    doubleClickZoom: true,
    center: this.currentLatLng,
    zoomControl: false,
    minZoom: 2,
    maxZoom: 18,
    zoom: this.zoom,
    fadeAnimation: true,
    zoomAnimation: true,
    scrollWheelZoom: true,
  };

  ngAfterViewInit(): void {

    if (!this.mapDiv) throw "No hay mapa desplegado";

    this.map = L.map(this.mapDiv?.nativeElement, this.options).setView([41.3181411, 2.0154439],);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(this.map);

    this.mapListeners();

  }

  mapListeners() {
    if (!this.map) throw "Mapa no inicializado";

    this.map.on('zoom', ev => {
      this.zoom = this.map!.getZoom();
    })

    this.map.on("zoomend", ev => {
      if (this.map!.getZoom() < 18) return;
      this.map!.setZoom(18);
    })

    this.map.on('move',()=>{
      this.currentLatLng=this.map!.getCenter();

    })
  }


  zoomIn() {
    this.map?.zoomIn();
  }
  zoomOut() {

    this.map?.zoomOut();
  this.map?.getCenter
  }

  zoomChanged(value: string): void {
    this.zoom = Number(value);
    this.map?.setZoom(this.zoom);
  }

}

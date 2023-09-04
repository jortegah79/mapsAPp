import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from "@angular/core";
import * as L from "leaflet";

interface MarkerAndColor {
  color: string;
  marker: L.Marker;
}

interface PlainMarker{
  color:string;
  latLng:L.LatLng;
  title:string;
}

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.css']
})
export class MarkersPageComponent implements AfterViewInit, OnDestroy {
  ngOnDestroy(): void {
    this.map?.remove();
  }


  @ViewChild('map') mapDiv?: ElementRef;

  public map?: L.Map;
  public currentLatLng: L.LatLng = new L.LatLng(41.3181411, 2.0154439);
  public markers: MarkerAndColor[] = [];


  options: L.MapOptions = {
    attributionControl: false,
    doubleClickZoom: true,
    center: this.currentLatLng,
    zoomControl: false,
    minZoom: 2,
    maxZoom: 18,
    zoom: 15,
    fadeAnimation: true,
    zoomAnimation: true,
    scrollWheelZoom: true,
  };

  optionsMarker: L.MarkerOptions = {
    icon: new L.DivIcon({ html: "<div ><span style='color:black;font-size:30px;text-shadow:4px 4px 3px black'><b>X</b></span></div>" }),
    draggable: true
  }
  ngAfterViewInit(): void {

    if (!this.mapDiv) throw "No hay mapa desplegado";

    this.map = L.map(this.mapDiv?.nativeElement, this.options).setView([41.3181411, 2.0154439],);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',).addTo(this.map);

    this.readFromLocalStorage();

  }


  addMarker(latLng: L.LatLng, color: string = 'red',title=''): void {

    if (!this.map) return;
    let options: L.MarkerOptions = {
      icon: new L.DivIcon({ html: `<div style='color:${color};font-size:30px;text-shadow:4px 4px 3px black'><b>X</b></div>` }),
      draggable: true,
      title:title
    }
    const marker = L.marker(latLng, options).addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage();

    marker.on('dragend',()=>{
     this.saveToLocalStorage();
    })
  }

  createMarker() {

    if (!this.map) return;
    let texto=prompt('Indica el nombre del nuevo marcador')??"marker ";
    if(texto=="") {
      texto='marker'
    }
    let color = '#xxxxxx'.replace(/x/g, y => (Math.random() * 16 | 0).toString(16));

    let latLong = this.map?.getCenter();

    this.addMarker(latLong, color,texto);

  }

  deleteMarker(index: number) {

    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
    this.saveToLocalStorage();
  }


  flyTo(marker: L.Marker): void {

   this.map?.flyTo( marker.getLatLng(),15)

  }

  saveToLocalStorage(){

    const plainMarker:PlainMarker[]=this.markers.map( ({color,marker}) =>{
      return {
        color,
        latLng:marker.getLatLng(),
        title:marker.options.title ??""
      }
    })
    localStorage.setItem('plainMarkers',JSON.stringify(plainMarker))

  }
  readFromLocalStorage(){

      const plainMarkers=localStorage.getItem('plainMarkers') ?? '[]';
      const markers : PlainMarker[] =JSON.parse(plainMarkers);

      markers.forEach(( {color,latLng,title})=>{
        this.addMarker(latLng,color,title);
      })


  }

}






// const popup = L.popup()
// .setLatLng([41.32325, 2.0133197307586674])
// .setContent("esto es una prueba")
// .openOn(this.map);

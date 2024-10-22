import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent  {

  private map: L.Map | undefined;

  colaDispo: any[] = [];
  idU: string | null = null;
  user : any =[];


  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router) { }


  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.idU = idU;
      this.getUserxUser();  // Cargar los usuarios y después inicializar el mapa
      this.proyectsService.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al cargar los tipos de usuario', err)
      )
    }
  }



  private initMap(): void {
    const greenIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });

    const redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
    if (!this.map) {
      this.map = L.map('mi_mapa').setView([21.47268, -101.22288], 15);
  
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: L.LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];
  
          if (this.map) {
            this.map.setView(userLocation, 15);
  
            // Añade un marcador en la ubicación del usuario
            L.marker(userLocation, {icon: redIcon})
              .addTo(this.map)
              .bindPopup("Estás aquí")
              .openPopup();
          }
        },
        () => {
          alert('No se pudo obtener tu ubicación.');
        }
      );
    } else {
      alert('Geolocalización no soportada por tu navegador.');
    }
  
    // Agregar marcadores basados en los datos de colaDispo
    if (this.map && this.colaDispo.length > 0) {
      this.colaDispo.forEach((usuario: any) => {
        const location: L.LatLngTuple = [usuario.lat, usuario.lng]; // Usar los nombres correctos
        L.marker(location, {icon: greenIcon})
          .addTo(this.map!)
          .bindPopup(`${usuario.nombres} está aquí`);  // No abrir todos los popups al mismo tiempo
      });
  
      this.map.on('click', function (e: L.LeafletMouseEvent) {
        alert(`Has clickeado en la posición ${e.latlng.toString()}`);
      });
    }
  }
  
  getUserxUser() {
    this.idU = this.route.snapshot.paramMap.get('idU');
    if (this.idU) {
      this.proyectsService.getUserxUser(this.idU).subscribe(
        resp => {
          console.log('Datos recibidos:', resp);
          this.colaDispo = resp;
          this.initMap();  // Llamar initMap después de cargar los datos
        },
        err => console.log(err)
      );
    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }
  }
}

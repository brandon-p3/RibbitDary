import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { Tarea, Material } from '../../../models/Proyect';
import * as L from 'leaflet';
import 'leaflet-routing-machine';



@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css']
})
export class TareaComponent implements OnInit {
  private map: L.Map | undefined;
  tarea: any = [];
  tareaUbi: any = [];
  colaUbi: any = [];
  colaboradorTareas: any = [];
  materiales: any = [];

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const idP = this.route.snapshot.paramMap.get('idP');
    const idU = this.route.snapshot.paramMap.get('idU');
    const idT = this.route.snapshot.paramMap.get('idT');

    if (idT && idP && idU) {
      this.getTarea(idU, idP, idT);
    }
  }

  getTarea(idU: string, idP: string, idT: string) {
    this.proyectsService.getTarea(idU, idP, idT).subscribe(
      resp => {
        console.log(resp);
        this.tarea = resp;
        this.tareaUbi = resp;
        this.getUsuario(this.tarea.idColaborador);
        this.getMateriales(this.tarea.idT); // Obtener y almacenar materiales de la tarea
      },
      err => console.error('Error al obtener tarea:', err)
    );
  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.colaboradorTareas = resp;
        this.colaUbi = resp; // Almacenar datos de usuario en un objeto usando idU como clave
        this.initMap();
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  getMateriales(idT: string) {
    this.proyectsService.getMaterialesTarea(idT).subscribe(
      resp => {
        this.materiales = resp; // Almacenar materiales en un objeto usando idT como clave
      },
      err => console.error('Error al obtener materiales:', err)
    );
  }

  volver() {
    const idP = this.route.snapshot.paramMap.get('idP');
    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/tareas/${idU}/${idP}`]);
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

    const yellowIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
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
            if (this.tareaUbi.lat && this.tareaUbi.lng) {

              const tareaLocation: L.LatLngTuple = [this.tareaUbi.lat, this.tareaUbi.lng];
              // L.Routing.control({
              //   waypoints: [
              //     L.latLng(userLocation[0], userLocation[1]),
              //     L.latLng(tareaLocation[0], tareaLocation[1])
              //   ],
              //   routeWhileDragging: true
              // }).addTo(this.map);


              L.marker(tareaLocation, { icon: yellowIcon })
                .addTo(this.map)
                .bindPopup(`Ubicación de la tarea: ${this.tareaUbi.nomTarea}`)
                .openPopup();
            }
            
            L.marker(userLocation, { icon: redIcon })
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

    if (this.colaboradorTareas.length > 0) {
      this.colaboradorTareas.forEach((usuario: any) => {
        const location: L.LatLngTuple = [usuario.lat, usuario.lng];
        L.marker(location, { icon: greenIcon })
          .addTo(this.map!)
          .bindPopup(`${usuario.nombres} está aquí`);
      });
    }
  }



}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea, Material } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';
import { GoogleCalendarService } from '../../../services/google-calendar.service';
import * as L from 'leaflet';
import { MatDialog } from '@angular/material/dialog'; // Importa MatDialog
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component'; // Asegúrate de importar tu componente de diálogo


@Component({
  selector: 'app-create-tareas',
  templateUrl: './create-tareas.component.html',
  styleUrls: ['./create-tareas.component.css']
})
export class CreateTareasComponent implements OnInit {
  tarea: Tarea = {
    idP: '',
    nomTarea: '',
    fechaI: '',
    descripcion: '',
    fechaF: '',
    idColaborador: 'opcion1',
    estatus: 'No iniciada'
  };
  private map: L.Map | undefined;

  newMaterial: string = '';
  idMaterialSelect: string[] = [];
  materiales: Material[] = [];
  materialSelect: any = [];
  tareaUbi: any = [];

  proyects: any = [];
  colaboradores: any = [];
  creadorProyect: any = [];
  edit: boolean = false;
  colaboradorForDrive: any = [];

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router,
    private googleCalendarService: GoogleCalendarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    const idP = this.route.snapshot.paramMap.get('idP');
    const idU = this.route.snapshot.paramMap.get('idU');
    const idT = this.route.snapshot.paramMap.get('idT');

    if (idP && idU) {
      this.getProyect(idP);
      this.getColaboradores(idP);
      this.getUsuario(idU);
    }

    if (idT && idP && idU) {
      this.getTarea(idU, idP, idT);
    }
    this.getMateriales();
  }

  //Cuando se edita se pide el proyecto
  async getProyect(idP: string) {
    this.proyectsService.getProyect(idP).subscribe(
      resp => {
        this.proyects = resp;
      },
      err => console.error('Error al obtener proyectos:', err)
    );
  }

  //Tambien obtener a sus colaboradres cuando se edita
  async getColaboradores(idP: string) {
    this.proyectsService.getColaboradores(idP).subscribe(
      resp => {
        this.colaboradores = resp;
        this.initMap();
      },
      err => console.error('Error al obtener colaboradores:', err)
    );
  }

  //Tambien obetner el usuaio que
  async getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.creadorProyect = resp;
      },
      err => console.error('Error al obtener usuario:', err)
    )
  }

  async getTarea(idU: string, idP: string, idT: string) {
    this.proyectsService.getTarea(idU, idP, idT).subscribe(
      resp => {
        console.log(resp);
        this.tarea = resp;
        this.edit = true;
        this.tareaUbi = resp;
        this.initMap();
      },
      err => console.error('Error al obtener tarea:', err)
    )
  }

  async getMateriales() {
    const idT = this.route.snapshot.paramMap.get('idT');
    if (idT) {
      this.proyectsService.getMaterialesTarea(idT).subscribe(
        resp => {
          this.materialSelect = resp;
        },
        err => console.error('Error al obtener materiales:', err)
      )
    }
  }

  volver() {
    const idP = this.route.snapshot.paramMap.get('idP');
    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/tareas/${idU}/${idP}`]);
  }

  //Añafir y editar, y gurar cosas y borrar
  addMaterial() {
    if (this.newMaterial) {
      this.materiales.push({ nombreMaterial: this.newMaterial });
      this.newMaterial = '';
    }
  }

  removeMaterial(material: Material) {
    const index = this.materiales.indexOf(material);
    if (index > -1) {
      this.materiales.splice(index, 1);
    }
  }



  saveNewMaterials(idT: string, idP: string) {
    this.materiales.forEach(material => {
      material.idT = idT;
      material.idP = idP;
      this.proyectsService.saveMaterial(material).subscribe(
        resp => {
          console.log('Material guardado:', resp);
        },
        err => console.error('Error al guardar material:', err)
      );
    });
  }

  async updateTarea() {
    const number: number = Number(this.tarea.idT);
    const number2: number = Number(this.tarea.idP);

    try {
      this.proyectsService.updateTarea(number, this.tarea).subscribe(
        resp => {
          console.log(resp);
          this.router.navigate(['/tareas']);
        },
        err => console.error('Error al actualizar tarea:', err)
      )

      for (const idMt of this.idMaterialSelect) {
        this.proyectsService.deleteMaterial(idMt).subscribe(
          resp => {
            console.log(resp);
            this.getMateriales();
          },
          err => console.error(err)
        );
      }

      this.saveNewMaterials(number.toString(), number2.toString());

      this.volver();
    } catch (err) {
      console.error('Error al actualizar la tarea:', err);
    }

  }

  deleteMateriales(idMt: string) {
    this.idMaterialSelect.push(idMt);
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

    // Inicializar el mapa si aún no existe
    if (!this.map) {
      this.map = L.map('mi_mapa').setView([21.47268, -101.22288], 15);

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);
    }

    // Mostrar la ubicación actual del usuario si se permite la geolocalización
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation: L.LatLngTuple = [
            position.coords.latitude,
            position.coords.longitude,
          ];

          if (this.map) {
            this.map.setView(userLocation, 15);

            // Añadir un marcador en la ubicación del usuario
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

    // Agregar marcadores para los colaboradores
    if (this.map && this.colaboradores.length > 0) {
      this.colaboradores.forEach((usuario: any) => {
        const location: L.LatLngTuple = [usuario.lat, usuario.lng];
        L.marker(location, { icon: greenIcon })
          .addTo(this.map!)
          .bindPopup(`${usuario.nombres} está aquí`);
      });
    }

    // Mostrar el marcador de la tarea si estamos en modo de edición
    if (this.map && this.edit) {
      const tareaLocation: L.LatLngTuple = [this.tareaUbi.lat, this.tareaUbi.lng];
      L.marker(tareaLocation, { icon: yellowIcon })
        .addTo(this.map!)
        .bindPopup(`Ubicación de la tarea: ${this.tareaUbi.nomTarea}`)
        .openPopup();
    }

    // Permitir al usuario seleccionar una nueva ubicación para la tarea
    this.map.on('click', (e: L.LeafletMouseEvent) => {
      this.tarea.lng = e.latlng.lng;
      this.tarea.lat = e.latlng.lat;

      // Remover el marcador anterior si existe, y agregar uno nuevo
      L.marker(e.latlng, { icon: yellowIcon })
        .addTo(this.map!)
        .bindPopup(`Ubicación seleccionada para la tarea: ${this.tarea.nomTarea}`)
        .openPopup();
    });
  }

  async saveNewTarea() {
    const idU = this.route.snapshot.paramMap.get('idU');
    const idP = this.route.snapshot.paramMap.get('idP');
  
    if (idU && idP) {
      this.tarea.idU = idU;
      this.tarea.idP = idP;
  
      // Asignar medio día como hora de inicio y fin
      if (this.tarea.fechaF && this.tarea.fechaI) {
        const startDateTime = new Date(this.tarea.fechaI);
        startDateTime.setHours(18, 0, 0);
  
        const endDateTime = new Date(this.tarea.fechaF);
        endDateTime.setHours(18, 0, 0);
  
        this.tarea.fechaI = startDateTime.toISOString();
        this.tarea.fechaF = endDateTime.toISOString();
      }
  
      try {
        const resp = await this.proyectsService.saveTarea(this.tarea).toPromise();
        console.log('Tarea guardada:', resp);
  
        if (resp && resp.idT) {
          const idT = resp.idT.toString();
          this.saveNewMaterials(idT, idP);
  
          // Diálogo de confirmación
          const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            data: {
              message: '¿Deseas agregar tu tarea a tu calendario de Google?',
              fechaInicio: this.tarea.fechaI,
              fechaFin: this.tarea.fechaF
            }
          });
  
          dialogRef.afterClosed().subscribe(async (result) => {
            if (result) { // Si el usuario acepta, agrega el evento en Google Calendar
              const idColaborador = this.tarea.idColaborador;
              if (idColaborador) {
                this.proyectsService.getUsuarioEdit(idColaborador).subscribe(
                  resp => {
                    console.log(resp);
                    this.colaboradorForDrive = resp;
  
                    // Crear el evento con los asistentes
                    const eventStart = {
                      summary: this.tarea.nomTarea,
                      description: `${this.tarea.descripcion}`,
                      location: `${this.tarea.lat}, ${this.tarea.lng}`, // Añadir ubicación
                      start: {
                        dateTime: this.tarea.fechaI,
                        timeZone: 'America/Mexico_City'
                      },
                      end: {
                        dateTime: this.tarea.fechaF,
                        timeZone: 'America/Mexico_City'
                      },
                      attendees: [
                        {
                          email: this.colaboradorForDrive.usuario // Añadir al colaborador como asistente
                        }
                      ]
                    };
  
                    // Llamada al servicio para agregar el evento al Google Calendar
                    this.googleCalendarService.addEvent(eventStart).then(eventResp => {
                      console.log('Evento creado en Google Calendar', eventResp);
                      this.volver(); // Redirige solo después de crear el evento
                    }).catch(error => {
                      console.error('Error al crear el evento en Google Calendar', error);
                      this.volver(); // Redirige si hay un error al crear el evento
                    });
                  },
                  err => console.error(err)
                );
              }
            } else {
              // Si el usuario elige "No", solo se redirige
              this.volver();
            }
          });
        }
      } catch (err) {
        console.error('Error al guardar tarea:', err);
      }
    }
  }
  

}
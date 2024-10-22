import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../services/proyects.service';
import { Usuario } from '../../models/Proyect';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  tareasUrgentes: any = [];
  tareasMedias: any = [];
  tareasNoUrgentes: any = [];
  tareasVencidas: any = [];
  materiales: any = {};
  colaboradorTareas: any = {};
  user: any = [];
  usuario: Usuario = {
    lng: 0,
    lat: 0
  }; 
  
  idP: string | null = null;
  idU: string | null = null;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idU) {
      this.getTareas();
      this.getUser(this.idU);
      this.updateUserLocation();
    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }

  getUser(idU: string) {
    if (idU) {
      this.proyectsService.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al obtener usuario:', err)
      );
    }
  }
  //Metodo para enviar correos
  sendEmail(){
    this.idU = this.route.snapshot.paramMap.get('idU');
    if(this.idU){
      this.proyectsService.sendCorreo(this.idU).subscribe(
        resp => {
          console.log('Correo enviado:', resp);
        },
        err => console.error('Error al enviar correo:', err)
      );
    } else {
      
    }
  }
   // Método para actualizar la ubicación del usuario
  updateUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;

          // Actualiza el objeto usuario con la nueva ubicación
          this.usuario.lat = lat;
          this.usuario.lng = lng;

          // Llama al servicio para actualizar la ubicación del usuario en la base de datos
          if (this.idU) {
            this.proyectsService.updateUbicacionUser(this.idU, this.usuario).subscribe(
              resp => {
                console.log('Ubicación actualizada:', resp);
              },
              err => console.error('Error al actualizar la ubicación:', err)
            );
          }
        },
        (error) => {
          console.error('Error al obtener la ubicación del usuario:', error);
        }
      );
    } else {
      console.error('Geolocalización no soportada por el navegador.');
    }
  }

  getTareas() {
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idU) {
      this.proyectsService.getTareasUrgentes(this.idU).subscribe(
        resp => {
          this.tareasUrgentes = resp;
          this.tareasUrgentes.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );

      this.proyectsService.getTareasMedias(this.idU).subscribe(
        resp => {
          this.tareasMedias = resp;
          this.tareasMedias.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );

      this.proyectsService.getTareasNoUrgentes(this.idU).subscribe(
        resp => {
          this.tareasNoUrgentes = resp;
          this.tareasNoUrgentes.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );

      this.proyectsService.getTareasVencidas(this.idU).subscribe(
        resp => {
          this.tareasVencidas = resp;
          this.tareasVencidas.forEach((tarea: any) => {
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );

    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.colaboradorTareas[idU] = resp;
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

}

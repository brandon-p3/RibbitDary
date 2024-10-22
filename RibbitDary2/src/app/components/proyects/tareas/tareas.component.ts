import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { Tarea } from '../../../models/Proyect';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {
  @HostBinding('class') classes = 'row';
  tareas: any = [];
  proyects: any = [];
  colaboradores: any = [];
  materiales: any = {};
  colaboradorTareas: any = {};
  user: any = [];
  estatus: Tarea = {
    estatus: ''
  }
  btnTarea = true;
  configT: any = [];

  idP: string | null = null;
  idU: string | null = null;
  idUP: string | null = null;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.idP = this.route.snapshot.paramMap.get('idP');
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idP && this.idU) {
      this.getColaboradores(this.idP);
      this.getTareas();
      this.getProyectT(this.idU, this.idP);
      this.getUser(this.idU);
      this.configUserPT(this.idU, this.idP);
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

  getColaboradores(idP: string) {
    this.proyectsService.getColaboradores(idP).subscribe(
      resp => {
        this.colaboradores = resp;
      },
      err => console.error('Error al obtener colaboradores:', err)
    );
  }

  getTareas() {
    this.idP = this.route.snapshot.paramMap.get('idP');
    this.idU = this.route.snapshot.paramMap.get('idU');

    if (this.idP && this.idU) {
      this.proyectsService.getTareaP(this.idU, this.idP).subscribe(
        resp => {
          this.tareas = resp;
          this.tareas.forEach((tarea: any) => {
            this.getMateriales(tarea.idT);
            this.getUsuario(tarea.idColaborador);
          });
        },
        err => console.error('Error al obtener tareas:', err)
      );
    } else {
      console.error('No se pudo obtener el idP o idU de la ruta.');
    }
  }

  getProyectT(idU: string, idP: string) {
    this.proyectsService.getProyectT(idU, idP).subscribe(
      resp => {
        this.proyects = resp;
        this.idUP = this.proyects.idU;
      },
      err => console.error('Error al obtener proyectos:', err)
    );
  }

  getMateriales(idT: string) {
    this.proyectsService.getMaterialesTarea(idT).subscribe(
      resp => {
        this.materiales[idT] = resp;  // Almacenar materiales en un objeto usando idT como clave
      },
      err => console.error('Error al obtener materiales:', err)
    );
  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.colaboradorTareas[idU] = resp;  // Almacenar datos de usuario en un objeto usando idU como clave
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  deleteTarea(idT: string) {
    console.log(idT);
    this.proyectsService.deleteTarea(idT).subscribe(
      resp => {
        console.log(resp);
        this.getTareas();
      },
      err => console.error(err)
    );
  }


  updateEstatus(tarea: any) {
    this.proyectsService.estatusTarea(tarea.idT, { estatus: tarea.estatus }).subscribe(
      resp => {
        console.log('Tarea actualizada:', resp);
      },
      err => console.error('Error al actualizar tarea:', err)
    );
  }

  //Bloquear el creador de tareas
  configUserPT(idU: string, idP: string) {
    this.proyectsService.configUserT(idU, idP).subscribe(
      resp => {
        if (Array.isArray(resp) && resp.length > 0) {
          this.configT = resp[0];
          const tareasActuales = this.configT.tareas;
          const cantidadPermitida = this.configT.cantidadTareas;

          this.btnTarea = tareasActuales < cantidadPermitida;
          console.log('Tareas del proyecto actuales:', tareasActuales, 'Cantidad permitida:', cantidadPermitida, 'btnTareas:', this.btnTarea); // Verifica el estado del botón
        } else {
          console.warn('No se encontraron datos en la respuesta.');
        }
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  mostrarAlerta() {
    console.log('Intento de crear un proyecto cuando btnPaquete es false');
    alert('Ya no puedes crear tareas, llegaste al límite de tu plan');
  }

  onButtonClick(userId: string) {
    if (!this.btnTarea) {
      this.mostrarAlerta();
    } else {
      // Si btnPaquete es verdadero, navegamos a la ruta
      this.router.navigate(['/crear-tareas', this.idU, this.idP]);
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Proyect, Proyectxcolab } from '../../../models/Proyect';
import { Router, ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-create-proyectos',
  templateUrl: './create-proyectos.component.html',
  styleUrls: ['./create-proyectos.component.css']
})
export class CreateProyectosComponent implements OnInit {

  proyect: Proyect = {
    nameProyect: '',
    idType: '',
    idU: '',
    fechaI: '',
    fechaF: '',
    descripcion: '',
    notas: '',
    presupuesto: 0,
    estatus: 'Activo',
  };

  colaboradoresSeleccionados: any[] = [];
  colaSelect: any[] = [];
  colaDispo: any[] = [];
  tempDeletedColaboradores: string[] = [];


  idP: string | null = null;
  idU: string | null = null;
  edit: boolean = false;

  tipoProy: any =[];

  constructor(
    private proyectsService: ProyectsService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idU = this.route.snapshot.paramMap.get('idU');
    this.idP = this.route.snapshot.paramMap.get('idP');

    if (this.idP && this.idU) {
      this.proyectsService.getProyectT(this.idU, this.idP).subscribe(
        resp => {
          console.log(resp);
          this.proyect = resp;
          this.edit = true;
        },
        err => console.log(err)
      );

    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }

    this.getUserxUser();
    this.getColaboradores();
    this.getTipoProyectos();
  }

  //Obtener cosas del proyecto
  getColaboradores() {
    this.idP = this.route.snapshot.paramMap.get('idP');

    if (this.idP) {

      this.proyectsService.getColaboradores(this.idP).subscribe(
        resp => {
          console.log(resp);
          this.colaSelect = resp;
        },
        err => console.log(err)
      );
    }
  }

  getUserxUser() {
    this.idU = this.route.snapshot.paramMap.get('idU');
    if (this.idU) {
      this.proyectsService.getUserxUser(this.idU).subscribe(
        resp => {
          this.colaDispo = resp;
        },
        err => console.log(err)
      );
    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }
  }

  volver(){
    this.idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/proyectos/${this.idU}`]);
  }

  //Guardar cosas
  toggleColaboradorSeleccionado(idColaborador: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      if (!this.colaboradoresSeleccionados.includes(idColaborador)) {
        this.colaboradoresSeleccionados.push(idColaborador);
      }
    } else {
      this.colaboradoresSeleccionados = this.colaboradoresSeleccionados.filter(id => id !== idColaborador);
    }
  }

  saveNewProyectxColab(idP: string) {
    if (idP && this.colaboradoresSeleccionados.length > 0) {
      this.colaboradoresSeleccionados.forEach(idColaborador => {
        const proyectxcolab: Proyectxcolab = {
          idColaborador: idColaborador,
          idP: idP
        };
        this.proyectsService.savePColaboradores(proyectxcolab).subscribe(
          resp => {
            console.log('Colaborador guardado:', resp);
          },
          err => console.error('Error al guardar colaborador en el proyecto:', err)
        );
      });
    } else {
      this.router.navigate(['/proyects']);
    }
  }

  deleteColaborador(idU: string) {
    this.tempDeletedColaboradores.push(idU);
  }


//Proyecto Guardar 
  async saveNewProyect() {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.proyect.idU = idU;
      try {
        const resp = await this.proyectsService.saveProyect(this.proyect).toPromise();
        console.log('Proyecto guardado:', resp);

        if (resp && resp.idP) {
          const idP = resp.idP.toString();
          this.saveNewProyectxColab(idP);
        }
        this.getUserxUser();
        this.volver();
      } catch (err) {
        console.error('Error al guardar proyecto:', err);
      }
    }
  }

  async updateProyect() {
    if (this.proyect.idP) {
      const number: number = Number(this.proyect.idP);

      try {
        // Actualizar el proyecto
        const resp = await this.proyectsService.updateProyect(number, this.proyect).toPromise();
        console.log('Proyecto actualizado:', resp);

        for (const idU of this.tempDeletedColaboradores) {
          if (this.idP) {
            await this.proyectsService.deletePColaborador(this.idP, idU).toPromise();
          }
        }
        await this.saveNewProyectxColab(number.toString());
        this.getUserxUser();
        this.getColaboradores();

        this.volver();

      } catch (err) {
        console.error('Error al actualizar el proyecto:', err);
      }
    } else {
      console.error('ID del proyecto no encontrado.');
    }
  }

  //Presupuesto solo permita numeros
  validateInput(event: KeyboardEvent) {
    const inputChar = String.fromCharCode(event.keyCode);
  
    // Permitir solo números
    if (!/[0-9]/.test(inputChar)) {
      event.preventDefault(); // Evita que se inserten letras u otros caracteres no permitidos
    }
  }
  

  //Obtener los tipos de proyectos que hay
  getTipoProyectos() {
    this.proyectsService.getTiposProyectos().subscribe(
      resp => {
        this.tipoProy = resp;
      },
      err => console.error('Error al obtener tipos Proyectos:', err)
    )
  }
}

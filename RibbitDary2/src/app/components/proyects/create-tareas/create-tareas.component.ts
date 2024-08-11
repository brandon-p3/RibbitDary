import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Tarea, Material } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

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

  newMaterial: string = '';
  idMaterialSelect: string[] = [];
  materiales: Material[] = [];
  materialSelect: any = [];

  proyects: any = [];
  colaboradores: any = [];
  creadorProyect: any = [];
  edit: boolean = false;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
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

  async saveNewTarea() {
    const idU = this.route.snapshot.paramMap.get('idU');
    const idP = this.route.snapshot.paramMap.get('idP');

    if (idU && idP) {
      this.tarea.idU = idU;
      this.tarea.idP = idP;
      try {
        const resp = await this.proyectsService.saveTarea(this.tarea).toPromise();
        console.log('Tarea guardada:', resp);

        if (resp && resp.idT) {
          const idT = resp.idT.toString();
          this.saveNewMaterials(idT, idP);
        }

        this.volver();
      } catch (err) {
        console.error('Error al guardar tarea:', err);
      }
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

}

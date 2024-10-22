import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { TipoProyecto } from '../../../models/Proyect';

@Component({
  selector: 'app-tipo-proyecto',
  templateUrl: './tipo-proyecto.component.html',
  styleUrls: ['./tipo-proyecto.component.css']
})
export class TipoProyectoComponent implements OnInit {
  tipoProy: TipoProyecto = {
    tipoProyecto: ''
  };
  
  tipoProyectos: any = [];

  edit: boolean = false;


  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getTipoProyectos();
  }

  getTipoProyectos() {
    this.proyectsService.getTiposProyectos().subscribe(
      resp => {
        this.tipoProyectos = resp;
      },
      err => console.error('Error al obtener tipos Proyectos:', err)
    );
  }

  deleteTipoProyecto(idType: string) {
    this.proyectsService.deleteTipoProyecto(idType).subscribe(
      resp => {
        this.getTipoProyectos();
      },
      err => console.error('Error al eliminar tipo Proyecto:', err)
    );
  }

  createOrUpdateTipoProyecto() {
    if (this.edit) {
      // Actualizar el tipo de proyecto
      const idType = this.tipoProy.idType;
      if (idType) {
        this.proyectsService.updateTipoProyecto(idType, this.tipoProy).subscribe(
          resp => {
            console.log('Tipo de proyecto actualizado:', resp);
            this.getTipoProyectos();
            this.resetForm();
          },
          err => console.error('Error al actualizar tipo Proyecto:', err)
        );
      }
    } else {
      // Crear un nuevo tipo de proyecto
      this.proyectsService.createTipoProyecto(this.tipoProy).subscribe(
        resp => {
          console.log('Tipo de proyecto guardado:', resp);
          this.getTipoProyectos();
          this.resetForm();
        },
        err => console.error('Error al crear tipo Proyecto:', err)
      );
    }
  }

  editTipoProyecto(tipoP: TipoProyecto) {
    this.tipoProy = { ...tipoP };
    this.edit = true;
  }

  resetForm() {
    this.tipoProy = { tipoProyecto: '' };
    this.edit = false;
  }
}

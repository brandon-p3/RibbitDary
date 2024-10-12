import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { Paquete } from '../../../models/Proyect';


@Component({
  selector: 'app-crear-paquetes',
  templateUrl: './crear-paquetes.component.html',
  styleUrls: ['./crear-paquetes.component.css']
})
export class CrearPaquetesComponent implements OnInit {
  paquete: Paquete = {
    idPaquete: '',
    tiempo: '',
    cantidadProy: '',
    cantidadTareas: '',
    numPersonas: '',
    namePaquete: '',
    precio: '',
    capacidad: ''
  };
  isEditMode: boolean = false;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPaquete = this.route.snapshot.paramMap.get('idPaquete');
    if (idPaquete) {
      this.isEditMode = true;
      this.proyectsService.getPaqueteById(idPaquete).subscribe((paquete) => {
        this.paquete = paquete;
      });
    }
  }
  
  savePaquete(): void {
    if (this.isEditMode) {
      this.proyectsService.actualizarPaquete(this.paquete.idPaquete, this.paquete).subscribe(() => {
        this.volver();

      });
    } else {
      this.proyectsService.crearPaquetes(this.paquete).subscribe(() => {
        this.volver();
      });
    }
  }

  volver() {
    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/paquetes/${idU}`]);
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { Tarjeta } from '../../../models/Proyect';

@Component({
  selector: 'app-crear-tarjeta',
  templateUrl: './crear-tarjeta.component.html',
  styleUrls: ['./crear-tarjeta.component.css']
})
export class CrearTarjetaComponent implements OnInit {

  tarjeta: Tarjeta = {
    numTarjeta: '',
    cvv: '',
    direccion: '',
    expira_year: '',
    expira_month: '',
    tipoTarjeta: 'Debito',
    titular: '',
    idU: '',
  };

  edit: boolean = false;
  months: string[] = [];
  years: string[] = [];

  constructor(
    private router: Router,
    private proyectService: ProyectsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    // Initialize month and year options
    this.initializeDateOptions();

    const numTarjeta = this.route.snapshot.paramMap.get('numTarjeta');
    const idU = this.route.snapshot.paramMap.get('idU');

    if (numTarjeta && idU) {
      this.proyectService.getTarjeta(numTarjeta).subscribe(
        resp => {
          console.log(resp);
          this.tarjeta = resp;
          this.edit = true;
        },
        err => console.error(err)
      );
    } else if (idU) {
      this.tarjeta.idU = idU;
    } else {
      console.error('No se pudo obtener el idU de la ruta.');
    }
  }

  initializeDateOptions() {
    // Initialize month options (1-12)
    this.months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    // Initialize year options (current year to 10 years ahead)
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 11 }, (_, i) => (currentYear + i).toString());
  }

  guardarTarjeta(): void {
    if (this.edit) {
      this.proyectService.updateTarjeta(this.tarjeta.numTarjeta, this.tarjeta).subscribe(
        resp => {
          this.volver();
        },
        err => console.error('Error al actualizar tarjeta', err)
      );
    } else {
      this.proyectService.createTarjeta(this.tarjeta).subscribe(
        resp => {
          this.volver();
        },
        err => console.error('Error al crear tarjeta', err)

      );
    }
  }

  volver() {
    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/tarjeta/${idU}`]);
  }
}

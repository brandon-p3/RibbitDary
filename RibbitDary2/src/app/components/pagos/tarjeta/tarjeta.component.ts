import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { Tarjeta } from '../../../models/Proyect';

@Component({
  selector: 'app-tarjeta',
  templateUrl: './tarjeta.component.html',
  styleUrls: ['./tarjeta.component.css']
})
export class TarjetaComponent implements OnInit {
  tarjetas: Tarjeta[] = [];
  idU: string | null = null;

  constructor(private proyectsService: ProyectsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.idU = this.route.snapshot.paramMap.get('idU');
    if (this.idU) {
      this.getTarjetas(this.idU);
    }
  }

  getTarjetas(idU: string) {
    this.proyectsService.getTarjetas(idU).subscribe(
      resp => {
        this.tarjetas = resp;
      },
      err => console.error('Error al obtener tarjetas:', err)
    );
  }

  eliminarTarjeta(numTarjeta: string) {
    this.proyectsService.deleteTarjeta(numTarjeta).subscribe(
      resp => {
        this.tarjetas = this.tarjetas.filter(tarjeta => tarjeta.numTarjeta !== numTarjeta);
      },
      err => console.error('Error al eliminar tarjeta:', err)
    );
  }
}

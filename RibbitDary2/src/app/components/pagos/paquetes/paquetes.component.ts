import { Component, OnInit } from '@angular/core';
import { ProyectsService } from '../../../services/proyects.service';
import { Paquete } from '../../../models/Proyect';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.css']
})
export class PaquetesComponent implements OnInit {
  paquetes: Paquete[] = [];
  idU: string | null = null;
  user : any =[];

  constructor(private proyectsService: ProyectsService,  private router: Router,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idU = this.route.snapshot.paramMap.get('idU');
    if (this.idU) {
      this.proyectsService.getUsuario(this.idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al cargar los tipos de usuario', err)
      )
    }
    this.getPaquetes();
  }

  getPaquetes(): void {
    this.proyectsService.getPaquetes().subscribe(paquetes => {
      this.paquetes = paquetes;
    });
  }

  eliminarPaquete(idPaquete: string): void {
    this.proyectsService.eliminarPaquete(idPaquete).subscribe(() => {
      this.paquetes = this.paquetes.filter(paquete => paquete.idPaquete !== idPaquete);
    });
  }

  comprarPaquete(paquete: Paquete): void {
    if (this.idU) {
      // Redirige a la ruta /pago/:idU/:idPaquete
      this.router.navigate([`/pago/${this.idU}/${paquete.idPaquete}`]);
    } else {
      console.error('ID de usuario no encontrado');
    }
  }
}

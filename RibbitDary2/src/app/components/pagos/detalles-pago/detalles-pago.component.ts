import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { DetallesPago } from '../../../models/Proyect'; // Asegúrate de tener este modelo
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalles-pago',
  templateUrl: './detalles-pago.component.html',
  styleUrls: ['./detalles-pago.component.css']
})
export class DetallesPagoComponent implements OnInit {
  detallesPago: any;
  idU!: string;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el idU desde la ruta
    this.idU = this.route.snapshot.paramMap.get('idU')!;
    // Cargar los detalles de pago
    this.proyectsService.getDP(this.idU).subscribe((data) => {
      this.detallesPago = data;
    });
  }

  // Método para eliminar un detalle de pago
  deleteDetalle(idDetallePago: string): void {
    if (confirm('¿Estás seguro de eliminar este detalle de pago?')) {
      this.proyectsService.deleteDetalle(idDetallePago).subscribe(() => {
        // Después de eliminar, recargar los detalles de pago
  
      });
    }
  }

  // Método para redirigir a la página de edición
  editDetalle(idDetallePago: string): void {
    this.router.navigate([`/editar-detalle-pago/${idDetallePago}`]);
  }
}

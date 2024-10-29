import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {
  paquete: any = []; // Paquete a pagar
  public payPalConfig?: IPayPalConfig; // Configuración de PayPal
  fechaInicio: Date = new Date(); // Fecha de inicio del paquete
  fechaFin: Date = new Date(); // Fecha de fin del paquete (30 días después)

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const idPaquete = this.route.snapshot.paramMap.get('idPaquete');
    if (idPaquete) {
      // Obtener los detalles del paquete por ID
      this.proyectsService.getPaqueteById(idPaquete).subscribe(
        resp => {
          this.paquete = resp;
          if (this.paquete && this.paquete.precio) {
            this.initConfig(); // Inicializar PayPal solo si hay precio
          } else {
            console.error('Paquete o precio no válidos');
          }
        },
        err => console.error('Error al obtener el paquete:', err)
      );
    }
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'MXN',
      clientId: 'AQSCJg9NGGUA86DHuvJYE6wlTWnHqnbM0I-ytYHs0uYhFKHG7_mYYYgAdtzyFlxuhFrObcJGqJTCi813',
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: 'MXN',
            value: this.paquete.precio,
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.paquete.precio
              }
            }
          },
          items: [{
            name: this.paquete.namePaquete, // Nombre del paquete
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'MXN',
              value: this.paquete.precio,
            },
          }]
        }]
      },
      advanced: { commit: 'true' },
      style: { label: 'paypal', layout: 'vertical' },

      onApprove: (data, actions) => {
        console.log('onApprove - transacción aprobada:', data);
        actions.order.get().then((details: any) => {
          console.log('Detalles de la orden:', details);
        }).catch(() => console.error('Error obteniendo detalles:'));
      },

      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - transacción completada:', data);

        // Calcular la fecha final (30 días después de la fecha actual)
        const fechaFin = new Date(this.fechaInicio);
        fechaFin.setDate(this.fechaInicio.getDate() + 30);

        const idU = this.route.snapshot.paramMap.get('idU');
        if (idU) {
          // Crear el objeto con los detalles del pago
          const detallesPago = {
            idU: idU,
            idPaquete: this.paquete.idPaquete,
            fechaI: this.fechaInicio,
            fechaF: fechaFin,
            create_time: new Date(),
            email_address: data.payer?.email_address || '', // Aquí garantizamos que siempre sea un string
            payer_id: data.payer?.payer_id || '', // Igual para payer_id
            status: data.status,
            orderID: data.id,
            amount: this.paquete.precio,
            currency: 'MXN',
            estatus: 'Activo'
          };
          

          // Llamar al servicio para registrar el pago en la base de datos
          this.proyectsService.createDetalle(idU, detallesPago).subscribe(
            () => {
              console.log('Pago registrado en el servidor');
              this.router.navigate([`/confirmacion/${this.paquete.idPaquete}`]);
              this.router.navigate([`/paquetes/${idU}`]);
            },
            err => console.error('Error registrando pago:', err)
          );
          alert("Se mandara el recibo a tu correo, para que estes atento, cualquier duda no dudes en contactarnos");

        } else {
          console.error('ID de usuario no encontrado');
        }
      },

      onCancel: (data, actions) => {
        console.log('Pago cancelado:', data);
      },

      onError: err => {
        console.error('Error en PayPal:', err);
      },

      onClick: (data, actions) => {
        console.log('Click en PayPal:', data);
      }
    };
  }

  volver(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.router.navigate([`/paquetes/${idU}`]);
    } else {
      console.error('ID de usuario no encontrado');
    }
  }
}

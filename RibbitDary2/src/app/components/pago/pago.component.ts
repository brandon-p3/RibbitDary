import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../services/proyects.service';
import { Paquete } from '../../models/Proyect';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrl: './pago.component.css'
})
export class PagoComponent implements OnInit {
  paquete: any = [];
  public payPalConfig?: IPayPalConfig;

  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
  ngOnInit(): void {
    const idPaquete = this.route.snapshot.paramMap.get('idPaquete');
    if (idPaquete) {

      this.proyectsService.getPaqueteById(idPaquete).subscribe(
        resp => {
          this.paquete = resp;
          this.initConfig();
          console.log(this.paquete);
        },
        err => console.error('Error al obtener tarea:', err)
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
            value: this.paquete?.precio,
            breakdown: {
              item_total: {
                currency_code: 'MXN',
                value: this.paquete?.precio
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: 'MXN',
              value: this.paquete?.precio,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then((details: any) => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
        const idU = this.route.snapshot.paramMap.get('idU'); // Obtén el idU
        if (idU) {
          this.router.navigate([`/home/${idU}`]); // Redirige a home con idU
        }
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);

      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);

      }
    };
  }
  volver(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/paquetes/${idU}`]);
  }
}

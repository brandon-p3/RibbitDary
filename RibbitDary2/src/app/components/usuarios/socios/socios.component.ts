import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrl: './socios.component.css'
})
export class SociosComponent implements OnInit {
  @HostBinding('class') classes = 'row';

  socios: any = [];
  proyectos: any = {};
  idU: string | null = null;
  user : any =[];

  btnSocios = true;
  configS:any = [];


  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.getsocios();
      this.configUserPT(idU);
      this.idU = idU;
      this.proyectsService.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al cargar los tipos de usuario', err)
      )
    }
  }


  getsocios() {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.proyectsService.getUserxUser(idU).subscribe(
        resp => {
          console.log('Datos recibidos:', resp);
          this.socios = resp;
          this.socios.forEach((socio: any) => {
            this.getProyectos(socio.idU);
          });
        },
        err => console.error('Error al obtener socios', err)
      );
    }
  }

  deleteSocio(idU: string) {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar este socio?');
    if (confirmation) {
      this.proyectsService.deleteUserxUser(idU).subscribe(
        resp => {
          console.log('Socio eliminado:', resp);
          this.getsocios();
        },
        err => console.error('Error al eliminar socio', err)
      );
    } else {
      console.log('Eliminación cancelada');
    }
  }
  

  getProyectos(idU: string) {
    this.proyectsService.getProyect(idU).subscribe(
      resp => {
        this.proyectos[idU] = resp;
      },
      err => console.error('Error al obtener proyectos', err)
    );
  }

  configUserPT(idU: string) {
    this.proyectsService.configUserPT(idU).subscribe(
        resp => {
            if (Array.isArray(resp) && resp.length > 0) {
                this.configS = resp[0];
                const sociosActuales = this.configS.socios;
                const cantidadPermitida = this.configS.numPersonas;

                this.btnSocios = sociosActuales < cantidadPermitida;
                console.log('Socios actuales:', sociosActuales, 'Cantidad permitida:', cantidadPermitida, 'btnSocios:', this.btnSocios); console
            } else {
                console.warn('No se encontraron datos en la respuesta.');
            }
        },
        err => console.error('Error al obtener usuario:', err)
    );
}

mostrarAlerta() {
  console.log('Intento de crear un proyecto cuando btnPaquete es false');
  alert('Ya no puedes crear socios, llegaste al límite de tu plan');
}

onButtonClick(userId: string) {
  if (!this.btnSocios) {
      this.mostrarAlerta();
  } else {
      // Si btnPaquete es verdadero, navegamos a la ruta
      this.router.navigate(['/crear-socios/', userId]);
  }
}


}
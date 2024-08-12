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


  constructor(
    private proyectsService: ProyectsService,
    private route: ActivatedRoute,
    public router: Router) { }

  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.getsocios();
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
    this.proyectsService.deleteUserxUser(idU).subscribe(
      resp => {
        console.log('Socio eliminado:', resp);
        this.getsocios();
      },
      err => console.error('Error al eliminar socio', err)
    );
  }

  getProyectos(idU: string) {
    this.proyectsService.getProyect(idU).subscribe(
      resp => {
        this.proyectos[idU] = resp;
      },
      err => console.error('Error al obtener proyectos', err)
    );
  }

}
import { Component, OnInit } from '@angular/core';
import { SociosComponent } from '../socios/socios.component';
import { ActivatedRoute, Router } from '@angular/router';
import { CreaSocio, UserxUser, Usuario } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-crear-socios',
  templateUrl: './crear-socios.component.html',
  styleUrl: './crear-socios.component.css'
})
export class CrearSociosComponent implements OnInit {
  creaSocio: CreaSocio = {
    nombres: '',
    aPuP: '',
    aPuM: '',
    usuario: '',
    password: '',
    idTipo: '3',
    icono: ''
  };

  userxUser : UserxUser = {
    idU: '',
    idColaborador: ''
  };
  user: any = [];
  confirmpass = '';
  constructor(public router: Router,
    private pryectsServices: ProyectsService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');
    if (idU) {
      this.pryectsServices.getUsuario(idU).subscribe(
        resp => {
          this.user = resp;
        },
        err => console.error('Error al cargar los tipos de usuario', err)
      )
    }
   
  }

  crearSocios() {
    if (this.creaSocio.password === this.confirmpass) {
      this.pryectsServices.crearUsuario(this.creaSocio).subscribe(
        resp => {
          console.log(resp);
          
          if(resp && resp.idU){
            const idU = this.route.snapshot.paramMap.get('idU');
            if(idU){
            this.CrearUserxUser(idU, resp.idU);
            }else{
              alert('Error al crear al usuario. Por favor, inténtelo de nuevo.');
            }
          }
        },
        err => console.error('Error al guardar al usuario socio', err)
      )
    } else {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');

    }
  };

  CrearUserxUser(idU: string, idColaborador: string){
    this.userxUser.idU = idU;
    this.userxUser.idColaborador = idColaborador;

    this.pryectsServices.crearUserxUser(this.userxUser).subscribe(
      resp => {
        console.log(resp);
      },
      err => console.error('Error al guardar al usuario x usuario', err)
    )

  }

}



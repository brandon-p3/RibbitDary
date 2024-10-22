import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserxUser, Usuario } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-crear-socios',
  templateUrl: './crear-socios.component.html',
  styleUrls: ['./crear-socios.component.css'] // Corregido el nombre de la propiedad (de 'styleUrl' a 'styleUrls')
})
export class CrearSociosComponent implements OnInit {

  crearSocio: Usuario = {
    nombres: '',
    aPuP: '',
    aPuM: '',
    usuario: '',
    password: '',
    idTipo: '3',
    icono: '',
    lng: 0,
    lat: 0
  };

  pass: Usuario ={
    password: ''
  }


  userxUser: UserxUser = {
    idU: '',
    idColaborador: ''
  };

  edit: boolean = false;
  user: boolean = false;
  confirmpass = '';
  confirmpass2='';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  constructor(
    private router: Router,
    private proyectService: ProyectsService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const idColaborador = this.route.snapshot.paramMap.get('idColaborador');
    const idU = this.route.snapshot.paramMap.get('idU');
    const e = this.route.snapshot.paramMap.get('e');

    if (idColaborador && idU) {
      this.proyectService.getUsuarioEdit(idColaborador).subscribe(
        resp => {
          console.log(resp);
          this.crearSocio = resp;
          this.pass = resp;
          this.edit = true;
          this.confirmpass = this.crearSocio.password || '';
        },
        err => console.error(err)
      );
    } else if (idU && e) {
      this.proyectService.getUsuarioEdit(idU).subscribe(
        resp => {
          console.log(resp);
          this.crearSocio = resp;
          this.pass = resp;
          this.edit = true;
          this.confirmpass = this.crearSocio.password || '';
        },
        err => console.error(err)
      );
    } else {
      console.error('No se pudo obtener el idP de la ruta.');
    }
  }

  volver() {
    const idColaborador = this.route.snapshot.paramMap.get('idColaborador');
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idColaborador && idU) {
      this.router.navigate([`/socios/${idU}`]);
    } else {
      this.router.navigate([`/home/${idU}`]);
    }
  }


  crearSocios(): void {
    if (this.crearSocio.password === this.confirmpass) {
      this.proyectService.crearUsuario(this.crearSocio).subscribe(
        resp => {
          console.log(resp);

          if (resp && resp.idU) {
            const idU = this.route.snapshot.paramMap.get('idU');
            if (idU) {
              this.CrearUserxUser(idU, resp.idU);
            } else {
              alert('Error al crear al usuario. Por favor, inténtelo de nuevo.');
            }
          }
          this.volver();

        },
        err => console.error('Error al guardar al usuario socio', err)
      );
    } else {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    }
  }

  CrearUserxUser(idU: string, idColaborador: string): void {
    this.userxUser.idU = idU;
    this.userxUser.idColaborador = idColaborador;

    this.proyectService.crearUserxUser(this.userxUser).subscribe(
      resp => {
        console.log(resp);
      },
      err => console.error('Error al guardar la relación usuario x usuario', err)
    );
  }

  updateSocio(): void {
    const idColaborador = this.route.snapshot.paramMap.get('idColaborador');
    const idU = this.route.snapshot.paramMap.get('idU');

    if (this.confirmpass === this.crearSocio.password) {
      if (idColaborador && idU) {
        this.proyectService.updateUsuario(idColaborador, this.crearSocio).subscribe(
          resp => {
            console.log(resp);
          },
          err => console.error('Error al actualizar al usuario', err)
        );
        this.volver();
      } else if (idU) {
        this.proyectService.updateUsuario(idU, this.crearSocio).subscribe(
          resp => {
            console.log(resp);
          },
          err => console.error('Error al actualizar al usuario', err)
        );
        this.volver();
      } else {
        alert('No se pudo actualizar al usuario');
      }
    } else {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    }
  }

  updatePassword(): void{
    const idColaborador = this.route.snapshot.paramMap.get('idColaborador');
    const idU = this.route.snapshot.paramMap.get('idU');

    if (this.confirmpass2 === this.pass.password) {
      if (idColaborador && idU) {
        this.proyectService.updateUsuarioPassword(idColaborador, this.pass).subscribe(
          resp => {
            console.log(resp);
          },
          err => console.error('Error al actualizar al usuario', err)
        );
        this.volver();
      } else if (idU) {
        this.proyectService.updateUsuarioPassword(idU, this.pass).subscribe(
          resp => {
            console.log(resp);
          },
          err => console.error('Error al actualizar al usuario', err)
        );
        this.volver();
      } else {
        alert('No se pudo actualizar al usuario');
      }
    } else {
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    }
  }
}

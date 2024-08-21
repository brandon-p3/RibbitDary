import { Component, Host, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../../models/Proyect';
import { ProyectsService } from '../../../services/proyects.service';


@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {
  usuario: Usuario = {
    nombres: '',
    aPuP: '',
    aPuM: '',
    usuario: '',
    password: '',
    idTipo: '2',
    icono: ''
  };
  confirmpass = '';
  constructor(public router: Router,
    private pryectsServices: ProyectsService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  crearUsuario() {

    if(this.usuario.password === this.confirmpass){
    this.pryectsServices.crearUsuario(this.usuario).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/usuarios'])
      },
      err => console.error('Error al guardar al usuario', err)

    )
    }else{
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    
    }
  };

}

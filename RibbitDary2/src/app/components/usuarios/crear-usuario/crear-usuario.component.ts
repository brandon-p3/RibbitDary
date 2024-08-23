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
  user: Usuario = {
    nombres: '',
    aPuP: '',
    aPuM: '',
    usuario: '',
    password: '',
    idTipo: '2',
    icono: ''
  };
  confirmpass = '';
  showPassword: boolean = false;

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
  
  constructor(public router: Router,
    private pryectsServices: ProyectsService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  crearUsuario() {

    if(this.user.password === this.confirmpass){
    this.pryectsServices.crearUsuario(this.user).subscribe(
      resp => {
        console.log(resp);
        this.router.navigate(['/usuarios']);
        this.router.navigate([`/login`]);
      },
      err =>  alert('Ese correo ya existe, intente otro.')
    )
    }else{
      alert('Las contraseñas no coinciden. Por favor, inténtelo de nuevo.');
    
    }
  };

}

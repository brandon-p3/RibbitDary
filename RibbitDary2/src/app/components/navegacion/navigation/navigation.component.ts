import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @HostBinding('class') classes = 'row';
  usuario: any = [];
  tipoUser: any = [];
  isMenuOpen = false;
  isSidebarOpen = false;
  btnPaquete = true;
  configPT:any = [];

  constructor(private proyectsService: ProyectsService,
    private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.getUsuario(idU);
      this.getTipoUser(idU);
      this.configUserPT(idU);
    }

  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.usuario = resp;
      },
      err => console.error('Error al obtener usuario:', err)
    );
  }

  getTipoUser(idU: string) {
    this.proyectsService.configUserById(idU).subscribe(
      resp => {
        this.tipoUser = resp;
      },
      err => console.error('Error al obtener usuario:', err)
    );

  }

  navigateToTwitch(idU: string) {
    if (idU) {
      localStorage.setItem('idU', idU); // Guardar el idU en localStorage
      this.router.navigate(['/sesionesUsuario', idU]); // Redirigir al componente Twitch
    } else {
      console.error('ID de usuario no encontrado');
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menú desplegable abierto:', this.isMenuOpen);
  }

  configUserPT(idU: string) {
    this.proyectsService.configUserPT(idU).subscribe(
        resp => {
            if (Array.isArray(resp) && resp.length > 0) {
                this.configPT = resp[0];
                const proyectosActuales = this.configPT.proyectos;
                const cantidadPermitida = this.configPT.cantidadProy;

                this.btnPaquete = proyectosActuales < cantidadPermitida;
                console.log('Proyectos actuales:', proyectosActuales, 'Cantidad permitida:', cantidadPermitida, 'btnPaquete:', this.btnPaquete); 
            } else {
                console.warn('No se encontraron datos en la respuesta.');
            }
        },
        err => console.error('Error al obtener usuario:', err)
    );
}

mostrarAlerta() {
  console.log('Intento de crear un proyecto cuando btnPaquete es false');
  alert('Ya no puedes crear proyectos, llegaste al límite de tu plan');
}

onButtonClick(userId: string) {
  if (!this.btnPaquete) {
      this.mostrarAlerta();
  } else {
      // Si btnPaquete es verdadero, navegamos a la ruta
      this.router.navigate(['/crear-proyectos', userId]);
  }
}



}

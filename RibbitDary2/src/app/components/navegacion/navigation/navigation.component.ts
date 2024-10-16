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

  constructor(private proyectsService: ProyectsService,
    private route: ActivatedRoute, public router: Router) { }

  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.getUsuario(idU);
      this.getTipoUser(idU);
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

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    console.log('Menú desplegable abierto:', this.isMenuOpen);
  }
  

}

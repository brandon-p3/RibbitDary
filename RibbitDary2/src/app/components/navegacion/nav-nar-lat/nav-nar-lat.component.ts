import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../../services/proyects.service';
@Component({
  selector: 'app-nav-nar-lat',
  templateUrl: './nav-nar-lat.component.html',
  styleUrl: './nav-nar-lat.component.css'
})
export class NavNarLatComponent {
  @HostBinding('class') classes = 'row';
  usuario: any = [];

  constructor(private proyectsService: ProyectsService,
    private route: ActivatedRoute, public router: Router) {}

  ngOnInit(): void {
    const idU = this.route.snapshot.paramMap.get('idU');

    if (idU) {
      this.getUsuario(idU);
    }

  }

  getUsuario(idU: string) {
    this.proyectsService.getUsuario(idU).subscribe(
      resp => {
        this.usuario = resp;
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


}

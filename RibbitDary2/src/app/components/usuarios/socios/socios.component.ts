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
  proyectos: any = [];


  constructor(
    private proyectsService: ProyectsService,
    public router: Router) { }

  ngOnInit(): void {
    this.getsocios();
  }

  getsocios() {
    this.proyectsService.getsocios().subscribe(
      resp => {
        console.log('Datos recibidos:', resp); 
        this.socios = resp;
      },
      err => console.error('Error al obtener socios', err)
    );
  }
  

}
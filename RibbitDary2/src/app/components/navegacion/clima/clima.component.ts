import { Component, OnInit } from '@angular/core';
import { ProyectsService } from '../../../services/proyects.service';

@Component({
  selector: 'app-clima',
  templateUrl: './clima.component.html',
  styleUrls: ['./clima.component.css']
})
export class ClimaComponent implements OnInit {
  weatherData: any;
  city: string = 'México'; 

  constructor(private proyectsService: ProyectsService) {}

  ngOnInit(): void {
    this.proyectsService.getWeather(this.city).then(data => {
      this.weatherData = data;
    }).catch(error => {
      console.error('Error al obtener los datos del clima:', error);
    });
  }

  getBackgroundImage(): string {
    return 'url(/assets/img/Imagenes_RibbitDary/fondo-cuadros-amarillos.jpg)'; // Cambia a la ruta de tu imagen fija
  }
}

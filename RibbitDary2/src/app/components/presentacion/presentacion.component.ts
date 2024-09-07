import { Component } from '@angular/core';

@Component({
  selector: 'app-presentacion',
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css'
})
export class PresentacionComponent {
  toggleMenu(): void {
    const menu = document.getElementById('menu');
    if (menu) {
      if (menu.style.display === 'block') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'block';
      }
    }
  }
}

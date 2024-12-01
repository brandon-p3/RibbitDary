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

  downloadApk() {
    const fileUrl = 'https://raw.githubusercontent.com/brandon-p3/RibbitDary-Android/main/app-debug.apk';
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = 'app-debug.apk'; // Nombre predeterminado del archivo
    anchor.target = '_blank';
    anchor.click();
  }

}

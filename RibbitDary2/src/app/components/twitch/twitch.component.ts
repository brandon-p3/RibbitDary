import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ProyectsService } from '../../services/proyects.service';
import { Usuario } from '../../models/Proyect';

@Component({
  selector: 'app-twitch',
  templateUrl: './twitch.component.html',
  styleUrls: ['./twitch.component.css']
})
export class TwitchComponent implements OnInit {
  streams: any[] = [];
  clientId: string = 'll4i6j9cv1bq80fmnu07pzyer9l747';
  accessToken: string | null = null;
  userId: string | null = null;
  usuario: Usuario = {
    userIdTwitch: ''
  };
  user: any = {};

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private proyectsService: ProyectsService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Recuperar el token de la URL o de localStorage
    this.extractAccessToken();

    // Verificar si hay un access token y continuar con la lógica
    if (this.accessToken) {
      this.getUserInfo();  // Obtener información del usuario
    } else {
      // Si no hay token, redirigir para autenticarse
      this.loginWithTwitch();
    }
  }

  // Método para extraer el token de la URL
  extractAccessToken() {
    const fragment = window.location.hash;
    const params = new URLSearchParams(fragment.replace('#', ''));
    this.accessToken = params.get('access_token');
    
    // Guardar el token en el almacenamiento local
    if (this.accessToken) {
      localStorage.setItem('access_token', this.accessToken);
    } else {
      this.accessToken = localStorage.getItem('access_token');
    }
  }

  // Obtener información del usuario de Twitch
  getUserInfo() {
    const headers = new HttpHeaders({
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    });

    const userUrl = 'https://api.twitch.tv/helix/users';
    this.http.get<any>(userUrl, { headers }).subscribe(
      (response) => {
        this.userId = response.data[0].id;
        console.log('User ID:', this.userId);
        this.usuario.userIdTwitch = this.userId;
        const idU = localStorage.getItem('idU');
        
        if (idU) {
          this.proyectsService.updateTwitchUser(idU, this.usuario).subscribe(
            resp => {
              console.log('Twitch actualizado:', resp);
            },
            err => console.error('Error actualizando la información del usuario:', err)
          )
        }
        this.checkUserStream();  // Verificar si el usuario está transmitiendo
      },
      (error) => {
        console.error('Error al obtener la información del usuario:', error);
      }
    );
  }

  // Verificar si el usuario está transmitiendo
  checkUserStream() {
    const headers = new HttpHeaders({
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    });

    const idU = localStorage.getItem('idU');
    if (idU) {
      this.proyectsService.getUsuarioTwitch(idU).subscribe(
        resp => {
          this.user = resp;
          const streamUrl = `https://api.twitch.tv/helix/streams?user_id=${this.user.userIdTwitch}`;
          this.http.get<any>(streamUrl, { headers }).subscribe(
            (response) => {
              if (response.data.length > 0) {
                this.streams = response.data;
              } else {
                console.log('El usuario no está transmitiendo en este momento.');
              }
            },
            (error) => {
              console.error('Error al comprobar el stream del usuario:', error);
            }
          );
        },
        err => console.error('Error al obtener usuario:', err)
      );
    }
  }

  // Método para generar la URL segura del stream de Twitch
  getEmbedUrl(userName: string): SafeResourceUrl {
    const url = `https://player.twitch.tv/?channel=${userName}&parent=localhost`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  // Método para generar la URL del chat de Twitch
  getChatEmbedUrl(userName: string): SafeResourceUrl {
    const chatUrl = `https://www.twitch.tv/embed/${userName}/chat?parent=localhost`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(chatUrl);
  }

  // Método para redirigir a la página de autenticación de Twitch
  loginWithTwitch() {
    const redirectUri = 'https://ribbit-dary.netlify.app/sesionesUsuario';
    const clientId = this.clientId;
    const scopes = 'user:read:follows chat:read';

    const url = `https://id.twitch.tv/oauth2/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes)}`;

    window.location.href = url; // Redirigir al usuario para autenticarse
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('access_token');
    this.accessToken = null; // Restablecer el token de acceso

    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/sesionesUsuario/${idU}`]); // Redirigir a la página de sesionesUsuario
  }
}

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
    this.extractAccessToken();
    const idU = localStorage.getItem('idU'); // Recuperar idU de localStorage

    if (this.accessToken) {
      this.getUserInfo();
      if (idU) {
        this.router.navigate(['/sesionesUsuario', idU]);
      }
    }

  }

  extractAccessToken() {
    const fragment = window.location.hash;
    const params = new URLSearchParams(fragment.replace('#', ''));
    this.accessToken = params.get('access_token');
    if (this.accessToken) {
      localStorage.setItem('access_token', this.accessToken);
    } else {
      this.accessToken = localStorage.getItem('access_token');
    }
  }

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
              console.log('Twitch actualizada:', resp);
            },
            err => console.error('Error updating user info:', err)
          )
        }
        this.checkUserStream();
      },
      (error) => {
        console.error('Error fetching user info:', error);
      }
    );
  }

  checkUserStream() {
    const headers = new HttpHeaders({
      'Client-ID': this.clientId,
      Authorization: `Bearer ${this.accessToken}`,
    });

    const idU = localStorage.getItem('idU');
    if(idU){
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
            console.error('Error checking user stream:', error);
          }
        );

      },
      err => console.error('Error al obtener usuario:', err)
    )
  }

  }

  getEmbedUrl(userName: string): SafeResourceUrl {
    const url = `https://player.twitch.tv/?channel=${userName}&parent=ribbitdary-4077c.web.app`;
    console.log(url);
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  
  getChatEmbedUrl(userName: string): SafeResourceUrl {
    const chatUrl = `https://www.twitch.tv/embed/${userName}/chat?parent=ribbitdary-4077c.web.app`;
    console.log(chatUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(chatUrl);
  }
  

  loginWithTwitch() {
    const redirectUri = 'https://ribbitdary-4077c.web.app/sesionesUsuario';
    // const redirectUri = 'http://localhost:4200/sesionesUsuario';
    const clientId = this.clientId;
    const scopes = 'user:read:follows chat:read'; 

    const url = `https://id.twitch.tv/oauth2/authorize` +
      `?client_id=${clientId}` +
      `&redirect_uri=${encodeURIComponent(redirectUri)}` +
      `&response_type=token` +
      `&scope=${encodeURIComponent(scopes)}`;

    window.location.href = url;
  }

  logout() {
    localStorage.removeItem('access_token');
    this.accessToken = null; // Restablecer el token de acceso

    const idU = this.route.snapshot.paramMap.get('idU');
    this.router.navigate([`/sesionesUsuario/${idU}`]);
  }
}
import { Component, OnInit } from '@angular/core';
import { ProyectsService } from '../../services/proyects.service'; // Asegúrate de que la ruta sea correcta
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username: string = '';
  password: string = '';

  constructor(
    private proyectsService: ProyectsService, 
    public router: Router, 
    private authServices: AuthService,
    private authService: SocialAuthService
  ) { }

  user: any;
  loggedIn: any;

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      console.log(this.user);
    });
  }

  signInWithGoogle(): void {
    this.proyectsService.loginG();
  }


  signOut(): void {
    this.authService.signOut();
  }
  
  login() {
    if (!this.username || !this.password) {
      alert('Por favor, ingrese ambos campos.');
      return;
    }
  
    this.proyectsService.login(this.username, this.password).subscribe(
      response => {
        const userId = response.userId;
  
        if (userId) {
          // Redirige al usuario a la ruta con su ID
          this.authServices.setAuthToken(true); // Establece el estado de autenticación
          this.router.navigate([`/home/${userId}`]);
        } else {
          console.error('ID de usuario no recibido');
        }
      },
      error => {
        alert('Tus datos de usuario son incorrectos');
        console.error('Error de login', error);
        this.username = '';
        this.password = '';
      }
    );
  }


  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user => {
      const fbToken = user.authToken;
  
      // Llama al backend para autenticar al usuario con el token de Facebook
      this.proyectsService.loginWithFacebook(fbToken).subscribe(
        response => {
          console.log('Login exitoso:', response);
          // Redirigir al usuario según sea necesario
          this.router.navigate([`/home/${response.userId}`]);
        },
        error => {
          console.error('Error en el inicio de sesión con Facebook:', error);
          alert('Error en el inicio de sesión con Facebook');
        }
      );
    });
  }
  
  
  loginWithFacebook(fbToken: string) {
    this.proyectsService.loginWithFacebook(fbToken).subscribe(
      (response) => {
        const userId = response.userId;
        if (userId) {
          this.authServices.setAuthToken(true);
          this.router.navigate([`/home/${userId}`]);
        } else {
          console.error('No se recibió el ID de usuario');
        }
      },
      (error) => {
        alert('Error al iniciar sesión con Facebook');
        console.error('Error de login con Facebook', error);
      }
    );
  }
  
}

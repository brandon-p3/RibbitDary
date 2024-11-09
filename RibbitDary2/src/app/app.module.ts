import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { NavigationComponent } from './components/navegacion/navigation/navigation.component';
import { TareasComponent } from './components/proyects/tareas/tareas.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { CreateProyectosComponent } from './components/proyects/create-proyectos/create-proyectos.component';
import { CreateTareasComponent } from './components/proyects/create-tareas/create-tareas.component';
import { HttpClientModule, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NavNarLatComponent } from './components/navegacion/nav-nar-lat/nav-nar-lat.component';
import { ProyectosComponent } from './components/proyects/proyectos/proyectos.component';
import { ProyectsService } from './services/proyects.service';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { BienvenidaComponent } from './components/usuarios/bienvenida/bienvenida.component';
import { CrearSociosComponent } from './components/usuarios/crear-socios/crear-socios.component';
import { SociosComponent } from './components/usuarios/socios/socios.component';
import { TipoProyectoComponent } from './components/proyects/tipo-proyecto/tipo-proyecto.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { TarjetaComponent } from './components/pagos/tarjeta/tarjeta.component';
import { CrearTarjetaComponent } from './components/pagos/crear-tarjeta/crear-tarjeta.component';
import { PaquetesComponent } from './components/pagos/paquetes/paquetes.component';
import { CrearPaquetesComponent } from './components/pagos/crear-paquetes/crear-paquetes.component';
import { DetallesPagoComponent } from './components/pagos/detalles-pago/detalles-pago.component';
import { MapaComponent } from './components/mapas/mapa/mapa.component';
import { MapasTareaComponent } from './components/mapas/mapas-tarea/mapas-tarea.component';
import { TareaComponent } from './components/proyects/tarea/tarea.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { MatDialogModule } from '@angular/material/dialog';

import { OAuthModule} from 'angular-oauth2-oidc';

// Define tus rutas aquí
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

//Modulos para inicios de sesion con redes
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from 'angularx-social-login';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { NewsComponent } from './components/navegacion/news/news.component';
import { TwitchComponent } from './components/twitch/twitch.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { EventCreatorComponent } from './event-creator/event-creator.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FirestoreModule } from '@angular/fire/firestore'; 
import { CommonModule } from '@angular/common';
import { ClimaComponent } from './components/navegacion/clima/clima.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PresentacionComponent,
    NavigationComponent,
    TareasComponent,
    ComentariosComponent,
    NavNarLatComponent,
    CreateProyectosComponent,
    CreateTareasComponent,
    ProyectosComponent,
    HomeComponent,
    SociosComponent,
    CrearSociosComponent,
    BienvenidaComponent,
    TipoProyectoComponent,
    CrearUsuarioComponent,
    TarjetaComponent,
    CrearTarjetaComponent,
    PaquetesComponent,
    CrearPaquetesComponent,
    DetallesPagoComponent,
    MapaComponent,
    MapasTareaComponent,
    TareaComponent,
    PagoComponent,
    NewsComponent,
    TwitchComponent,
    ChatbotComponent,
    EventCreatorComponent,
    ClimaComponent,
  ],
  
  bootstrap: 
  [AppComponent

  ],
   imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SocialLoginModule,
    NgxPayPalModule,
    CommonModule,
    OAuthModule.forRoot(),
    HttpClientModule,
  ], 
    providers: [
      ProyectsService,
      provideHttpClient(withInterceptorsFromDi()),
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  'clientId'
                )
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('441044812351366')
              }
            ],
            onError: (err) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        }
    ],
    exports: [
      ClimaComponent
    ]
})
export class AppModule { }
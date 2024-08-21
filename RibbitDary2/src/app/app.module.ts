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
import { HttpClientModule } from '@angular/common/http';
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

// Define tus rutas aquí
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
];

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
    CrearUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,    
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes), // Asegúrate de que `routes` esté definido
  ],
  providers: [
    ProyectsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

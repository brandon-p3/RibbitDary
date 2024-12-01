import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PresentacionComponent } from './components/presentacion/presentacion.component';
import { TareasComponent } from './components/proyects/tareas/tareas.component';
import { ComentariosComponent } from './components/comentarios/comentarios.component';
import { ProyectosComponent } from './components/proyects/proyectos/proyectos.component';
import { CreateProyectosComponent } from './components/proyects/create-proyectos/create-proyectos.component'; 
import { CreateTareasComponent } from './components/proyects/create-tareas/create-tareas.component'; 
import { HomeComponent } from './components/home/home.component';
import { SociosComponent } from './components/usuarios/socios/socios.component';
import { CrearSociosComponent } from './components/usuarios/crear-socios/crear-socios.component';
import { TipoProyectoComponent } from './components/proyects/tipo-proyecto/tipo-proyecto.component';
import { CrearUsuarioComponent } from './components/usuarios/crear-usuario/crear-usuario.component';
import { TarjetaComponent } from './components/pagos/tarjeta/tarjeta.component';
import { CrearTarjetaComponent } from './components/pagos/crear-tarjeta/crear-tarjeta.component';
import { PaquetesComponent } from './components/pagos/paquetes/paquetes.component';
import { CrearPaquetesComponent } from './components/pagos/crear-paquetes/crear-paquetes.component';
import { DetallesPagoComponent } from './components/pagos/detalles-pago/detalles-pago.component';
import { TareaComponent } from './components/proyects/tarea/tarea.component';
import { PagoComponent } from './components/pagos/pago/pago.component';
import { TwitchComponent } from './components/twitch/twitch.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/presentacion',
    pathMatch: 'full'
  },
//ChatBot
{ path: 'chatbot/:idU', component: ChatbotComponent },
  //Usuarios
  {path: 'crear-usuario', component: CrearUsuarioComponent},
  {path:'edit-usuario/edit/:idU/:e', component: CrearSociosComponent},

  //Socios
  {path:'socios/:idU', component: SociosComponent},
  {path:'crear-socios/:idU', component: CrearSociosComponent},
  {path:'edit-socios/edit/:idU/:idColaborador', component: CrearSociosComponent},


  // Presentacion
  { path: 'presentacion', component: PresentacionComponent },

  // Rutas de tareas
  { path: 'tarea/:idU/:idP/:idT', component: TareaComponent },
  { path: 'tareas/:idU/:idP', component: TareasComponent },
  { path: 'crear-tareas/:idU/:idP', component: CreateTareasComponent },
  { path: 'edit-tarea/edit/:idU/:idP/:idT', component: CreateTareasComponent },

  // Comentarios
  { path: 'comentarios', component: ComentariosComponent },

  // Rutas Proyectos
  { path: 'proyectos/:idU', component: ProyectosComponent },
  { path: 'crear-proyectos', component: CreateProyectosComponent },
  { path: 'crear-proyectos/:idU', component: CreateProyectosComponent },
  { path: 'edit-proyectos/edit/:idU/:idP', component: CreateProyectosComponent },

  // Home
  { path: 'home/:idU', component: HomeComponent },
  { path: 'home', component: HomeComponent }, 


  //Para usuarios Admin
  {path: 'tipo-proyecto/:idU', component: TipoProyectoComponent},
  {path: 'tipo-proyecto/edit/:idU/:idType', component: TipoProyectoComponent},

  //Tarjeta
  {path:'tarjeta/:idU', component: TarjetaComponent},
  {path: 'crear-tarjeta/:idU', component: CrearTarjetaComponent},
  { path: 'edit-tarjeta/edit/:idU/:numTarjeta', component: CrearTarjetaComponent },

  //Paquetes
  {path:'paquetes/:idU', component: PaquetesComponent},
  {path: 'crear-paquetes/:idU', component: CrearPaquetesComponent},
  {path: 'edit-paquetes/edit/:idU/:idPaquete', component: CrearPaquetesComponent},
  {path: 'pago/:idU/:idPaquete', component: PagoComponent},

  //Detalles pago
  {path: 'detalles-pago/:idU', component: DetallesPagoComponent},

  //Twitch
  {path: 'sesionesUsuario/:idU', component: TwitchComponent},
  {path: 'sesionesUsuario', component: TwitchComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

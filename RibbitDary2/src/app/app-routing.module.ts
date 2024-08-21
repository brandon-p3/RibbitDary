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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    redirectTo: '/presentacion',
    pathMatch: 'full'
  },

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


  //Para usuarios Admin
  {path: 'tipo-proyecto/:idU', component: TipoProyectoComponent},
  {path: 'tipo-proyecto/edit/:idU/:idType', component: TipoProyectoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

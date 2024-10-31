import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ObservedValueOf, of } from 'rxjs';

import {
  Proyect, Tarea, Proyectxcolab, Material, Usuario,
  TipoProyecto, UserxUser, CreaSocio, Paquete, DetallesPago, Tarjeta
} from '../models/Proyect';

@Injectable({
  providedIn: 'root'
})
export class ProyectsService {

  //private API_BASE_URL = 'https://server-production-11e4.up.railway.app/api';
  //private loginUrl = 'https://server-production-11e4.up.railway.app/api/login';

  private API_BASE_URL = 'http://localhost:5000/api';
  private loginUrl = 'http://localhost:5000/api/login';
  private apiKey = '31e2925f71534cbd9b020403b113357d';  // Clave API de NewsAPI
  private apiUrl = 'https://newsapi.org/v2/top-headlines';

  constructor(private http: HttpClient) { }


  //Usuarios
  getUsuario(idU: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_BASE_URL}/usuario/${idU}`);
  }

  login(correo: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { correo, password });
  }

  loginWithFacebook(fbToken: string): Observable<any> {
    return this.http.post<any>(`${this.API_BASE_URL}/auth/facebook`, { fbToken });
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.API_BASE_URL}/usuario`, usuario);
  }

  updateUsuario(idU: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_BASE_URL}/usuario/${idU}`, usuario);
  }

  updateUsuarioPassword(idU: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_BASE_URL}/usuario/password/edit/${idU}`, usuario);
  }

  updateUbicacionUser(idU: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_BASE_URL}/usuario/ubi/edit/${idU}`, usuario);
  }

  updateTwitchUser(idU: string, usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.API_BASE_URL}/usuario/userIdTwitch/edit/${idU}`, usuario);
  }


  //Mandar correo
  sendCorreo(idU: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_BASE_URL}/correo/correo-tareasU/${idU}`);
  }


  //User x User
  getUserxUser(idU: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/userxuser/${idU}`);
  }

  getsocios(): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/usuario`);
  }

  crearUserxUser(UserxUser: UserxUser): Observable<UserxUser> {
    return this.http.post<UserxUser>(`${this.API_BASE_URL}/userxuser/`, UserxUser);
  }

  deleteUserxUser(idU: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/userxuser/${idU}`);
  }

  getUsuarioEdit(idU: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_BASE_URL}/usuario/edit/${idU}`);
  }

  getUsuarioTwitch(idU: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.API_BASE_URL}/usuario/userIdTwitch/${idU}`);
  }

  // Obtener un tipo de proyecto por ID
  getTipoproyecto(idType: string): Observable<TipoProyecto> {
    return this.http.get<TipoProyecto>(`${this.API_BASE_URL}/tipoproyecto/${idType}`);
  }

  getTiposProyectos(): Observable<TipoProyecto> {
    return this.http.get<TipoProyecto>(`${this.API_BASE_URL}/tipoproyecto`);
  }

  createTipoProyecto(tipoProyecto: TipoProyecto): Observable<TipoProyecto> {
    return this.http.post<TipoProyecto>(`${this.API_BASE_URL}/tipoproyecto`, tipoProyecto);
  }

  deleteTipoProyecto(idType: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/tipoproyecto/${idType}`);
  }

  updateTipoProyecto(idType: string, tipoProyecto: TipoProyecto): Observable<TipoProyecto> {
    return this.http.put<TipoProyecto>(`${this.API_BASE_URL}/tipoproyecto/${idType}`, tipoProyecto);
  }


  // Proyectos
  getProyects(): Observable<Proyect[]> {
    return this.http.get<Proyect[]>(`${this.API_BASE_URL}/proyects`);
  }

  getProyect(idU: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/proyects/${idU}`);
  }

  getProyectT(idU: string, idP: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/proyects/${idU}/${idP}`);
  }

  saveProyect(proyect: Proyect): Observable<Proyect> {
    return this.http.post<Proyect>(`${this.API_BASE_URL}/proyects`, proyect);
  }

  buscarProyect(idU: string, busqueda: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/proyects/busqueda/${idU}/${busqueda}`);
  }

  deleteProyect(idP: string): Observable<Proyect> {
    return this.http.delete<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`);
  }

  updateProyect(idP: number, updatedProyect: Proyect): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.API_BASE_URL}/proyects/${idP}`, updatedProyect);
  }

  getProgreso(idP: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/progreso/${idP}`);
  }

  estatusProyecto(idP: number, updatedProyect: Proyect): Observable<Proyect> {
    return this.http.put<Proyect>(`${this.API_BASE_URL}/proyects/estatusProyecto/${idP}`, updatedProyect);
  }


  // Colaboradores
  getColaboradores(idP: string): Observable<any> {
    return this.http.get<any>(`${this.API_BASE_URL}/proyectxcolab/${idP}`);
  }

  savePColaboradores(proyectxcolab: Proyectxcolab): Observable<Proyectxcolab> {
    return this.http.post<Proyectxcolab>(`${this.API_BASE_URL}/proyectxcolab`, proyectxcolab);
  }

  deletePColaborador(idP: string, idC: string): Observable<Proyectxcolab> {
    return this.http.delete<Proyectxcolab>(`${this.API_BASE_URL}/proyectxcolab/${idP}/${idC}`);
  }


  // Tareas
  getTareas(idU: string): Observable<Tarea[]> {
    return this.http.get<Tarea[]>(`${this.API_BASE_URL}/tareas/${idU}`);
  }

  getTareaP(idU: string, idP: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/tareas/${idU}/${idP}`);
  }

  getTarea(idU: string, idP: string, idT: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/tareas/${idU}/${idP}/${idT}`);
  }

  saveTarea(tarea: Tarea): Observable<Tarea> {
    return this.http.post<Tarea>(`${this.API_BASE_URL}/tareas`, tarea);
  }

  deleteTarea(idT: string): Observable<Tarea> {
    return this.http.delete<Tarea>(`${this.API_BASE_URL}/tareas/${idT}`);
  }

  updateTarea(idT: number, updatedTarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.API_BASE_URL}/tareas/${idT}`, updatedTarea);
  }

  estatusTarea(idT: number, updatedTarea: Tarea): Observable<Tarea> {
    return this.http.put<Tarea>(`${this.API_BASE_URL}/tareas/estatusTarea/${idT}`, updatedTarea);
  }





  // Estado de tarea
  getTareasUrgentes(idU: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/filtrado/tareasUrgentes/${idU}`);
  }

  getTareasMedias(idU: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/filtrado/tareasMedias/${idU}`);
  }

  getTareasNoUrgentes(idU: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/filtrado/tareasNoUrgentes/${idU}`);
  }

  getTareasVencidas(idU: string): Observable<Tarea> {
    return this.http.get<Tarea>(`${this.API_BASE_URL}/filtrado/tareasVencidas/${idU}`);
  }


  //Filtrado de proyectos
  getProyectosActivos(idU: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/filtradoP/activos/${idU}`);
  }

  getProyectosBajaTemporal(idU: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/filtradoP/bajaTemporal/${idU}`);
  }

  getProyectosCancelados(idU: string): Observable<Proyect> {
    return this.http.get<Proyect>(`${this.API_BASE_URL}/filtradoP/cancelados/${idU}`);
  }


  //Materiales
  getMaterialesTarea(idT: string): Observable<Material> {
    return this.http.get<Material>(`${this.API_BASE_URL}/materiales/${idT}`);
  }

  saveMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(`${this.API_BASE_URL}/materiales`, material);
  }

  deleteMaterial(idMt: string): Observable<Material> {
    return this.http.delete<Tarea>(`${this.API_BASE_URL}/materiales/${idMt}`);
  }

  //Detalles de pago
  getDP(idU: string): Observable<DetallesPago[]> {
    return this.http.get<DetallesPago[]>(`${this.API_BASE_URL}/detallespago/${idU}`);
  }

  createDetalle(idU: String, detallePago: DetallesPago): Observable<DetallesPago> {
    return this.http.post<DetallesPago>(`${this.API_BASE_URL}/detallespago/${idU}`, detallePago);
  }

  updateDetalle(idDetallePago: string, detallePago: DetallesPago): Observable<DetallesPago> {
    return this.http.put<DetallesPago>(`${this.API_BASE_URL}/detallespago/${idDetallePago}`, detallePago);
  }

  deleteDetalle(idDetallePago: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/detallespago/${idDetallePago}`);
  }

  //Tarjeta
  getTarjetas(idU: string): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.API_BASE_URL}/tarjeta/${idU}`);
  }

  getTarjeta(numTarjeta: string): Observable<Tarjeta> {
    return this.http.get<Tarjeta>(`${this.API_BASE_URL}/tarjeta/edit/${numTarjeta}`);
  }

  createTarjeta(tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(`${this.API_BASE_URL}/tarjeta`, tarjeta);
  }

  updateTarjeta(numTarjeta: string, tarjeta: Tarjeta): Observable<Tarjeta> {
    return this.http.put<Tarjeta>(`${this.API_BASE_URL}/tarjeta/${numTarjeta}`, tarjeta);
  }

  deleteTarjeta(numTarjeta: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/tarjeta/${numTarjeta}`);
  }

  //Paquetes
  getPaquetes(): Observable<Paquete[]> {
    return this.http.get<Paquete[]>(`${this.API_BASE_URL}/paquete`);
  }

  getPaqueteById(idPaquete: string): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.API_BASE_URL}/paquete/edit/${idPaquete}`);
  }


  crearPaquetes(paquete: Paquete): Observable<Paquete> {
    return this.http.post<Paquete>(`${this.API_BASE_URL}/paquete`, paquete);
  }

  actualizarPaquete(idPaquete: string, paquete: Paquete): Observable<Paquete> {
    return this.http.put<Paquete>(`${this.API_BASE_URL}/paquete/${idPaquete}`, paquete);
  }

  eliminarPaquete(idPaquete: string): Observable<void> {
    return this.http.delete<void>(`${this.API_BASE_URL}/paquete/${idPaquete}`);
  }

  //Configuracion Usuario
  configUserById(idU: string): Observable<Paquete> {
    return this.http.get<Paquete>(`${this.API_BASE_URL}/configUser/${idU}`);
  }

  configUserPT(idU: string) {
    return this.http.get(`${this.API_BASE_URL}/configUser/paquetesU/${idU}`);
  }

  configUserT(idU: string, idP: string) {
    return this.http.get(`${this.API_BASE_URL}/configUser/tareasU/${idU}/${idP}`);
  }


  //API de Noticios
  getTopHeadlines(country: string = 'us'): Observable<any> {
    return this.http.get(`${this.apiUrl}?country=${country}&apiKey=${this.apiKey}`);
  }

}

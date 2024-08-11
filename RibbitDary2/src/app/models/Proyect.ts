export interface Proyect {
  idP?: number;
  nameProyect?: string;
  idType?: string;
  idU?: string; 
  fechaI?: string;
  fechaF?: string;
  descripcion?: string;
  notas?: string;
  progreso?: string;
  presupuesto?:number;
  estatus?:string;
}


  export interface Tarea{
    idT?: string,
    idP?: string,
    nomTarea?: string,
    fechaI?: string,
    descripcion?: string,
    fechaF?: string,
    estatus?: string,
    idU?: string,
    idColaborador?: string,
  }

  export interface Proyectxcolab{
    idP?: string,
    idColaborador?: string
  }

  export interface Material{
    idMt?: string,
    nombreMaterial?: string,
    idT?:string,
    idP?:string
  }

  export interface Usuario {
    idU?: string,
    nombres?: string,
    aPuP?: string,
    aPuM?: string,
    usuario?: string,
    password?: string,
    idTipo?: string,
    icono?: string
  }
  
  export interface CreaSocio {
    idU?: string,
    nombres?: string,
    aPuP?: string,
    aPuM?: string,
    usuario?: string,
    password?: string,
    idTipo?: string,
    icono?: string
  }
  

  export interface TipoProyecto {
    idType?: string; // La propiedad debería ser opcional si no siempre está presente
    tipoProyecto: string;
  }
  
  export interface UserxUser {
    idU?: string,
    idColaborador?: string,
  }
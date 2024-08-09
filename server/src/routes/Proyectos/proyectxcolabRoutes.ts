import {Router} from 'express';
import { proyectxcolabController } from '../../controllers/Proyectos/proyectxcolabController';

class ProyectxcolabRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', proyectxcolabController.list); 
        this.router.get('/:idP', proyectxcolabController.listUP); 
    //Creando una ruta para mi aplicación del servidor para la 
    //ruta inicial y se devuelve el mensaje Hello
       this.router.get('/:idU/:idP', proyectxcolabController.getOne);
       this.router.post('/', proyectxcolabController.create);
      // this.router.put('/:idPC', proyectxcolabController.update);
       this.router.delete('/:idP/:idColaborador', proyectxcolabController.delete);
    }
}

const proyectxcolabRoutes = new ProyectxcolabRoutes;
export default proyectxcolabRoutes.router;

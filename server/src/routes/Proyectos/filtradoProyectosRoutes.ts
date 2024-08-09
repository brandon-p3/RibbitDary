import {Router} from 'express';
import { filtradoProyectosController } from '../../controllers/Proyectos/filtradoProyectsController';

class FiltradoProyectoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        //Para ver las tareas por su urgencia
        this.router.get('/activos/:idU', filtradoProyectosController.proyectosActivos);
        this.router.get('/bajaTemporal/:idU', filtradoProyectosController.proyectosBajaTemporal);
        this.router.get('/cancelados/:idU', filtradoProyectosController.proyectosCancelados);

    }
}

const filtradoProyectoRoutes = new FiltradoProyectoRoutes;
export default filtradoProyectoRoutes.router;

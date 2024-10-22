import { Router } from 'express';
import { proyectsController } from '../../controllers/Proyectos/proyectsController';

class ProyectsRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', proyectsController.list);
        this.router.get('/:idU', proyectsController.listU);
        //Creando una ruta para mi aplicación del servidor para la 
        //ruta inicial y se devuelve el mensaje Hello
        this.router.post('/', proyectsController.create);
        this.router.delete('/:idP', proyectsController.delete);
        this.router.put('/:idP', proyectsController.update);
        this.router.get('/:idU/:idP', proyectsController.getOne);

        // En tu archivo de enrutador (por ejemplo, `proyects.routes.ts`)
        this.router.get('/busqueda/:idU/:b', proyectsController.buscarProyecto);

        //Para actualizar el estatus de la tarea
        this.router.put('/estatusProyecto/:idP', proyectsController.estusProyecto);

    }
}

const proyectsRoutes = new ProyectsRoutes;
export default proyectsRoutes.router;

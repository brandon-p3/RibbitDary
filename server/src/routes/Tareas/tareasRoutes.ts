import {Router} from 'express';
import { tareasController } from '../../controllers/Tareas/tareasController';

class TareasRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/:idP', tareasController.list); 
    //Creando una ruta para mi aplicación del servidor para la 
    //ruta inicial y se devuelve el mensaje Hello
        this.router.post('/', tareasController.create);
        this.router.delete('/:idT', tareasController.delete);
        this.router.put('/:idT', tareasController.update);
        this.router.get('/:idU/:idP/:idT', tareasController.getOne);
        this.router.get('/:idU/:idP', tareasController.listP);

        //Para actualizar el estatus de la tarea
        this.router.put('/estatusTarea/:idT', tareasController.estusTarea);

    }
}

const tareasRoutes = new TareasRoutes;
export default tareasRoutes.router;

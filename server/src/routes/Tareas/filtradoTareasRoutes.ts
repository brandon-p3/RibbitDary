import {Router} from 'express';
import { filtradoTareasController } from '../../controllers/Tareas/filtradoTareasController';

class FiltradoTareasRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        //Para ver las tareas por su urgencia
        this.router.get('/tareasUrgentes/:idU', filtradoTareasController.tareasUrgentes);
        this.router.get('/tareasMedias/:idU', filtradoTareasController.tareasMedias);
        this.router.get('/tareasNoUrgentes/:idU', filtradoTareasController.tareasNoUrgentes);
        this.router.get('/tareasVencidas/:idU', filtradoTareasController.tareasVencidas);
    }
}

const filtradoTareasRoutes = new FiltradoTareasRoutes;
export default filtradoTareasRoutes.router;

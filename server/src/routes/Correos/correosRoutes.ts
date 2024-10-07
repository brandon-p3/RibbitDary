import {Router} from 'express';
import { correoController} from '../../controllers/Correos/correosController';

class CorreosRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        //Para ver las tareas por su urgencia
        this.router.post('/prueba-correo', correoController.enviarCorreo);

    }
}

const correosRoutes = new CorreosRoutes;
export default correosRoutes.router;

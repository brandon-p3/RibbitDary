import {Router} from 'express';
import { configUserController } from '../../controllers/Configuracion Usuario/configUserController';

class ConfigUserRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/:idU', configUserController.tipoDeUsuario);  
        this.router.get('/paquetesU/:idU', configUserController.paquetesUsuario);
        this.router.get('/tareasU/:idU/:idP', configUserController.tareasUsuario);
    }

}

const configUserRoutes = new ConfigUserRoutes;
export default configUserRoutes.router;
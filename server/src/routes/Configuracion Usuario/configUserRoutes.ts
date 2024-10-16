import {Router} from 'express';
import { configUserController } from '../../controllers/Configuracion Usuario/configUserController';

class ConfigUserRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/:idU', configUserController.tipoDeUsuario);  
    }

}

const configUserRoutes = new ConfigUserRoutes;
export default configUserRoutes.router;
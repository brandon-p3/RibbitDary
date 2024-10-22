import {Router} from 'express';
import { paquetesController } from '../../controllers/Pagos/paquetesController';

class PaquetesRoutes{
    public router: Router = Router();
     constructor() {
        this.config();
    }
     config():void{
        this.router.get('/', paquetesController.listPaquetes);
        this.router.post('/', paquetesController.crearPaquetes);
        this.router.put('/:idPaquete', paquetesController.actualizarPaquete);
        this.router.delete('/:idPaquete', paquetesController.eliminarPaquete);
        this.router.get('/edit/:idPaquete', paquetesController.obtenerPaquetePorId);
    }

}

const paquetesRoutes = new PaquetesRoutes;
export default paquetesRoutes.router;
import {Router} from 'express';
import { detallesPagoController } from '../../controllers/Pagos/detallesPagoController';

class DetallesPagoRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/:idU',detallesPagoController.listDP); 
        this.router.post('/:idU', detallesPagoController.createDetalle);  
        this.router.put('/:idDetallePago', detallesPagoController.updateDetalle); 
        this.router.delete('/:idDetallePago', detallesPagoController.deleteDetalle); 
    }

}

const detallesPagoRoutes = new DetallesPagoRoutes;
export default detallesPagoRoutes.router;
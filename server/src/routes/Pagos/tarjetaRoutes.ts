import {Router} from 'express';
import { tajertaController } from '../../controllers/Pagos/tarjetaController';

class TajertaRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/:idU', tajertaController.list); 
        this.router.post('/', tajertaController.createTarjeta); 
        this.router.put('/:numTarjeta', tajertaController.updateTarjeta); 
        this.router.delete('/:numTarjeta', tajertaController.deleteTarjeta);
        this.router.get('/edit/:numTarjeta', tajertaController.getOne);
    }

}

const tajertaRoutes = new TajertaRoutes;
export default tajertaRoutes.router;
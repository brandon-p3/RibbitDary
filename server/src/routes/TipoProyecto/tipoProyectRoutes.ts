import { Router } from 'express';
import { tipoProyectoController } from '../../controllers/TipoProyecto/tipoProyectController';

class TipoProyectoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idType', tipoProyectoController.proyectoTipo);
        this.router.get('/', tipoProyectoController.getTipoProyecto);
        this.router.post('/', tipoProyectoController.create);
        this.router.put('/:idType', tipoProyectoController.update);
        this.router.delete('/:idType', tipoProyectoController.delete);
    }
    
   
        
}

const tipoProyectoRoutes = new TipoProyectoRoutes;
export default tipoProyectoRoutes.router;
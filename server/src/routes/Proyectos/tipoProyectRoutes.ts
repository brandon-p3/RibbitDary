import { Router } from 'express';
import { tipoProyectoController } from '../../controllers/TipoProyecto/tipoProyectController';

class TipoProyectoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idType', tipoProyectoController.proyectoTipo);
    }
    
   
        
}

const tipoProyectoRoutes = new TipoProyectoRoutes;
export default tipoProyectoRoutes.router;
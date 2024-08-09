import { Router } from 'express';
import { progresoController } from '../../controllers/Proyectos/progresoController';

class ProgresoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        //Obtener Progreso
        this.router.get('/:idP', progresoController.getProgreso);

    }
}

const progresoRoutes = new ProgresoRoutes;
export default progresoRoutes.router;

import {Router} from 'express';
import { matriealesController } from '../../controllers/Materiales/materialesController';

class MaterialesRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', matriealesController.list); 
        this.router.get('/:idT', matriealesController.getList); 
        this.router.post('/', matriealesController.create);
        this.router.delete('/:idMt', matriealesController.delete);
    }
}

const materialesRoutes = new MaterialesRoutes;
export default materialesRoutes.router;

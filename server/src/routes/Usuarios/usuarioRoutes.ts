import {Router} from 'express';
import { usuarioController } from '../../controllers/Usuarios/usuarioController';

class UsuarioRoutes{
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config():void{
        this.router.get('/', usuarioController.list); 
        this.router.get('/:idU', usuarioController.getOne); 
        this.router.get('/edit/:idU', usuarioController.getOneEdit);
        this.router.post('/', usuarioController.create); 
        this.router.put('/:idU',usuarioController.update);
        this.router.delete('/:idU',usuarioController.delete);
        this.router.put('/password/edit/:idU', usuarioController.updatePassword);
        this.router.put('/ubi/edit/:idU', usuarioController.ubicacion);
        this.router.put('/userIdTwitch/edit/:idU', usuarioController.updateTwitch);
        this.router.get('/userIdTwitch/:idU', usuarioController.getUserStream);
    }
}

const usuarioRoutes = new UsuarioRoutes;
export default usuarioRoutes.router;
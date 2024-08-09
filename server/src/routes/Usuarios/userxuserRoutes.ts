import { Router } from 'express';
import { userxuserController } from '../../controllers/Usuarios/userxuserController';

class UserxuserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idU', userxuserController.getUserxuser);
    }
}

const userxuserRoutes = new UserxuserRoutes();
export default userxuserRoutes.router;

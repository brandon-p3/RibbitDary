import { Router } from 'express';
import { userxuserController } from '../../controllers/Usuarios/userxuserController';

class UserxuserRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/:idU', userxuserController.getUserxuser);
        this.router.post('/', userxuserController.createUserxUser);
        this.router.delete('/:idColaborador', userxuserController.deleteUserxUser);
        this.router.get('/:idU', userxuserController.getOne);
    }
}

const userxuserRoutes = new UserxuserRoutes();
export default userxuserRoutes.router;

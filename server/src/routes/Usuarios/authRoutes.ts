import { Router } from 'express';
import { authController } from '../../controllers/Usuarios/authController';

class AuthRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.post('/login', authController.login); // Asegúrate de que el controlador esté correctamente asignado
        this.router.post('/auth/facebook', authController.loginWithFacebook);
    }
}

const authRoutes = new AuthRoutes();
export default authRoutes.router;

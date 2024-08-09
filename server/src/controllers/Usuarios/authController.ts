import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import pool from '../../database'; // Asegúrate de que esta ruta sea correcta

class AuthController {
    public async login(req: Request, res: Response) {
        const { correo, password } = req.body;
        
        try {
            // Buscar al usuario en la base de datos
            const [user] = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [correo]);

            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            const coinciden = await bcrypt.compare(password, user.password);

            if (!coinciden) {
                return res.status(401).json({ message: 'Contraseña incorrecta' });
            }
            // Autenticación exitosa
            res.json({ message: 'Login exitoso', userId: user.idU });
        } catch (error) {
            console.error('Error en el login:', error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
    }
}

export const authController = new AuthController();

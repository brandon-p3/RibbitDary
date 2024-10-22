import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import pool from '../../database'; // Asegúrate de que esta ruta sea correcta
import axios from 'axios';

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

    public async loginWithFacebook(req: Request, res: Response) {
        const { fbToken } = req.body;

        try {
            // Verifica el token con la API de Facebook, incluyendo el campo "picture" para obtener la imagen de perfil
            const fbResponse = await axios.get(
                `https://graph.facebook.com/me?access_token=${fbToken}&fields=id,name,email,picture.type(large)`
            );
            
            const { id: fb_id, name, email, picture } = fbResponse.data;
            const icono = picture.data.url; // URL de la imagen de perfil del usuario

            // Verifica si el usuario ya existe en la base de datos por el fb_id
            const [user] = await pool.query('SELECT * FROM usuario WHERE fb_id = ?', [fb_id]);

            if (!user) {
                // Si el usuario no existe, crea uno nuevo con los datos de Facebook, incluyendo el icono
                const result = await pool.query(
                    'INSERT INTO usuario (usuario, nombres, fb_id, idTipo, icono) VALUES (?, ?, ?, ?, ?)', 
                    [email, name, fb_id, 2, icono]
                );
                const userId = result.insertId;
                return res.json({ message: 'Usuario creado con Facebook', userId: userId });
            }
            
            await pool.query(
                'UPDATE usuario SET icono = ? WHERE fb_id = ?',
                [icono, fb_id]
            );

            // Si el usuario ya existe, simplemente devuelve su ID
            res.json({ message: 'Login exitoso con Facebook', userId: user.idU, icono: user.icono });
          
        } catch (error) {
            console.error('Error al verificar el token de Facebook:', error);
            return res.status(500).json({ message: 'Error en el servidor al verificar el token de Facebook' });
        }
    }
}

export const authController = new AuthController();

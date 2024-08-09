import { Request, Response } from "express";
import pool from '../../database';

class UserxuserController {
    public async getUserxuser(req: Request, res: Response): Promise<void> {
        const { idU } = req.params;
        try {
            const userxuser = await pool.query(`
                SELECT usuario.* FROM usuario 
                INNER JOIN userxuser 
                ON userxuser.idColaborador = usuario.idU
                WHERE userxuser.idU = ?
            `, [idU]);

            // Enviar la respuesta al cliente
            res.json(userxuser);
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }
}

export const userxuserController = new UserxuserController();

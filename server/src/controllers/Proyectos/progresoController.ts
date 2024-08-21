import { Request, Response } from 'express';
import pool from '../../database'


class ProgresoController {
    public async getProgreso(req: Request, resp: Response){
        const { idP } = req.params;
        try{
            const progreso = await pool.query(`
                SELECT ((SELECT COUNT(*) FROM tarea WHERE idP = ? AND estatus = "Terminada")/
                (COUNT(*) )*100) as progreso 
                FROM tarea WHERE idP = ?
                `, [idP, idP]);
            
            resp.json(progreso);
        }catch(error){
            console.error('Error en el progreso:', error);
            resp.status(500).json({ message: 'Error en el servidor' });
        }
    }

}

export const progresoController = new ProgresoController();

import { Request, Response } from 'express';
import pool from "../../database";

class ConfigUserController {
    public async tipoDeUsuario(req: Request, res: Response) {
        try {
            const idU = req.params.idU;
            const usuario = await pool.query(`SELECT * FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU]);
            res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }

    public async paquetesUsuario(req: Request, res: Response) {
        try {
            const idU = req.params.idU;
            const usuario = await pool.query(`SELECT p.cantidadProy, 
                (SELECT COUNT(*) FROM proyecto WHERE idU = ?) as proyectos, p.numPersonas, 
                (SELECT COUNT(*) FROM userxuser WHERE idU = ?) as socios
                FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU, idU, idU, idU]);
            res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }

    public async tareasUsuario(req: Request, res: Response) {
        try {
            const idU = req.params.idU;
            const idP = req.params.idP;
            const usuario = await pool.query(`SELECT p.cantidadTareas,
                (SELECT COUNT(*) FROM tarea WHERE idU = ? AND idP = ?) as tareas
                FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU, idP, idU]);
            res.json(usuario);
        }
        catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }


}

export const configUserController = new ConfigUserController();
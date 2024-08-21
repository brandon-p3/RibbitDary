import { Request, Response } from 'express';
import pool from '../../database'


class FiltradoTareasController {
    //Filtrado de tareas estatus
    public async tareasUrgentes(req: Request, resp: Response) {
        const { idU } = req.params;

        const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

        if (user.length > 0 && user[0].idTipo === 1) {
            const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 10
                AND DATEDIFF(fechaF, CURDATE()) >= 0
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
            resp.json(proyect);
        } else {
            const proyect = await pool.query(`
            SELECT * FROM tarea
            WHERE (idU = ? OR idColaborador = ?)
            AND DATEDIFF(fechaF, CURDATE()) < 10
            AND DATEDIFF(fechaF, CURDATE()) >= 0
            AND estatus != "Terminada"
            ORDER BY fechaF
        `, [idU, idU]);
            resp.json(proyect);
        }
    }


    public async tareasMedias(req: Request, resp: Response) {
        const { idU } = req.params;

        const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

        if (user.length > 0 && user[0].idTipo === 1) {
            const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 20
                AND DATEDIFF(fechaF, CURDATE()) >= 10
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
            resp.json(proyect);
        } else {
            const proyect = await pool.query(`
            SELECT * FROM tarea
            WHERE (idU = ? OR idColaborador = ?)
            AND DATEDIFF(fechaF, CURDATE()) < 20
            AND DATEDIFF(fechaF, CURDATE()) >= 10
            AND estatus != "Terminada"
            ORDER BY fechaF
        `, [idU, idU]);
            resp.json(proyect);
        }
    }


    public async tareasNoUrgentes(req: Request, resp: Response) {
        const { idU } = req.params;

        const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

        if (user.length > 0 && user[0].idTipo === 1) {
            const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE  DATEDIFF(fechaF, CURDATE()) >= 20
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
            resp.json(proyect);
        } else {
            const proyect = await pool.query(`
            SELECT * FROM tarea
            WHERE (idU = ? OR idColaborador = ?)
            AND DATEDIFF(fechaF, CURDATE()) >= 20
            AND estatus != "Terminada"
            ORDER BY fechaF
        `, [idU, idU]);
            resp.json(proyect);
        }
    }

    public async tareasVencidas(req: Request, resp: Response) {
        const { idU } = req.params;
        const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

        if (user.length > 0 && user[0].idTipo === 1) {
            const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE fechaF < CURDATE()
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
            resp.json(proyect);
        } else {
            const proyect = await pool.query(`
            SELECT * FROM tarea
            WHERE (idU = ? OR idColaborador = ?)
            AND fechaF < CURDATE()
            AND estatus != "Terminada"
            ORDER BY fechaF
        `, [idU, idU]);
            resp.json(proyect);
        }
    }



}

export const filtradoTareasController = new FiltradoTareasController();

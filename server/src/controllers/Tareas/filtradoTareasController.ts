import { Request, Response } from 'express';
import pool from '../../database';
import nodemailer from 'nodemailer';

class FiltradoTareasController {

       // Filtrado de tareas por estatus
    public async tareasUrgentes(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 10
                AND DATEDIFF(fechaF, CURDATE()) >= 0
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
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
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error al obtener las tareas urgentes' });
        }
    }

    public async tareasMedias(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 20
                AND DATEDIFF(fechaF, CURDATE()) >= 10
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
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
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error al obtener las tareas medias' });
        }
    }

    public async tareasNoUrgentes(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) >= 20
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
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
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error al obtener las tareas no urgentes' });
        }
    }

    public async tareasVencidas(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const proyect = await pool.query(`
                SELECT * FROM tarea
                WHERE fechaF < CURDATE()
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
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
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error al obtener las tareas vencidas' });
        }
    }

}

export const filtradoTareasController = new FiltradoTareasController();

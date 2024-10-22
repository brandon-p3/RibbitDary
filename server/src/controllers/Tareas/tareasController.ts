import { Request, Response } from 'express';
import pool from '../../database';

class TareasController {
    public async list(req: Request, resp: Response) {
        try {
            const proyect = await pool.query(`
                SELECT * FROM tarea
                ORDER BY fechaI
            `);
            resp.json(proyect);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving tasks' });
        }
    }

    public async listP(req: Request, resp: Response) {
        const { idU, idP } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) { 
                const tareas = await pool.query(`
                    SELECT *
                    FROM tarea WHERE idP = ?`, [idP]);
                resp.json(tareas);
            } else {
                const tareas = await pool.query(`
                    SELECT *
                    FROM tarea
                    WHERE idP = ? AND (idU = ? OR idColaborador = ?)
                    ORDER BY fechaI
                `, [idP, idU, idU]);
                resp.json(tareas);
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving tasks' });
        }
    }

    public async create(req: Request, resp: Response): Promise<void> {
        try {
            console.log(req.body);
            const result = await pool.query('INSERT INTO tarea SET ?', [req.body]);
            const idT = result.insertId;
            resp.json({ message: 'Tarea Saved', idT: idT });
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error saving task' });
        }
    }

    public async delete(req: Request, resp: Response) {
        const { idT } = req.params;
        try {
            await pool.query('DELETE FROM material WHERE idT = ?', [idT]);
            await pool.query('DELETE FROM tarea WHERE idT = ?', [idT]);
            resp.json({ message: 'Tarea deleted' });
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error deleting task' });
        }
    }

    public async update(req: Request, resp: Response) {
        const { idT } = req.params;
        try {
            await pool.query('UPDATE tarea SET ? WHERE idT = ?', [req.body, idT]);
            resp.json({ message: 'Updating a Tarea ' + req.params.id });
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error updating task' });
        }
    }

    public async getOne(req: Request, resp: Response) {
        const { idU, idP, idT } = req.params;
        try {
            const tarea = await pool.query('SELECT * FROM tarea WHERE idU = ? AND idP = ? AND idT = ?', [idU, idP, idT]);

            if (tarea.length > 0) {
                resp.json(tarea[0]);
            } else {
                resp.status(404).json({ message: 'Tarea not found' });
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving task' });
        }
    }

    public async estusTarea(req: Request, resp: Response) {
        const { idT } = req.params;
        try {
            await pool.query('UPDATE tarea SET ? WHERE idT = ?', [req.body, idT]);
            resp.json({ message: 'Updating a Tarea ' + req.params.id });
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error updating task status' });
        }
    }
}

export const tareasController = new TareasController();

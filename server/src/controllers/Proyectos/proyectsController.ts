import { Request, Response } from 'express';
import pool from '../../database'

class ProyectsController {
    public async list(req: Request, resp: Response) {
        const proyect = await pool.query('SELECT * FROM proyecto');
        resp.json(proyect);

    }


    public async listU(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const [checar] = await pool.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                // Si el usuario es del tipo 1 (administrador, por ejemplo)
                const proyect = await pool.query('SELECT * FROM proyecto');
                resp.json(proyect);

            } else {

                if (checar) {  // Verificar si hay resultados
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                } else {
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    ORDER BY fechaI`, [idU]);
                    resp.json(proyectos);
                }
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }


    public async getOne(req: Request, resp: Response) {
        const { idU, idP } = req.params;

        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const result = await pool.query(
                `SELECT * FROM proyecto WHERE idP = ?`, [idP]);
                resp.json(result[0]);

            } else {
                const query = `
                SELECT proyecto.*
                FROM proyecto
                LEFT JOIN proyectxcolab ON proyecto.idP = proyectxcolab.idP
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) 
                OR (proyecto.idP = ? AND proyectxcolab.idColaborador = ?)
            `;

                const result = await pool.query(query, [idP, idU, idP, idU]);
                if (result.length > 0) {
                    resp.json(result[0]);
                } else {
                    resp.status(404).json({ message: 'Proyecto no encontrado' });
                }
            }


        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            resp.status(500).json({ message: 'Error interno del servidor' });
        }
    }



    public async create(req: Request, resp: Response): Promise<void> {
        console.log(req.body);
        const result = await pool.query('INSERT INTO proyecto SET ?', [req.body]);
        const idP = result.insertId; // Obtener el ID del proyecto recién creado
        resp.json({ message: 'Proyect Saved', idP: idP }); // Devolver el ID del proyecto
    }


    public async delete(req: Request, resp: Response) {
        const { idP } = req.params;
        try {
            // Borrar todas las filas en proyectxcolab donde idP sea igual a idP
            await pool.query('DELETE FROM proyectxcolab WHERE idP = ?', [idP]);

            await pool.query('DELETE FROM material WHERE idP = ?', [idP]);

            // Borrar el proyecto en la tabla proyecto
            await pool.query('DELETE FROM tarea WHERE idP = ?', [idP]);

            // Borrar el proyecto en la tabla proyecto
            await pool.query('DELETE FROM proyecto WHERE idP = ?', [idP]);

            resp.json({ message: 'Proyect deleted' });
        } catch (error) {
            console.error('Error al borrar proyecto:', error);
            resp.status(500).json({ message: 'Error al borrar proyecto' });
        }

    }

    public async update(req: Request, resp: Response) {
        const { idP } = req.params;
        await pool.query('UPDATE proyecto SET ? WHERE idP =?', [req.body, idP]);
        resp.json({ message: 'Updating a proyects ' + req.params.idU });
    }

    public async buscarProyecto(req: Request, resp: Response): Promise<void> {
        const { idU } = req.params;  // idU es el primer parámetro
        const { b } = req.params;    // b es el segundo parámetro

        try {
            const [checar] = await pool.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);

            if (checar) {  // Verificar si hay resultados
                const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ? AND proyecto.nameProyect LIKE ?
                    ORDER BY fechaI
                    `, [idU, `%${b}%`]);

                resp.json(proyectos);
                console.log('Proyectos encontrados:', proyectos); // Log para depuración

            } else {
                const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ? AND proyecto.nameProyect LIKE ?
                    ORDER BY fechaI`, [idU, `%${b}%`]);

                resp.json(proyectos);
                console.log('Proyectos encontrados:', proyectos); // Log para depuración
            }


        } catch (error) {
            console.error('Error en la búsqueda:', error);
            resp.status(500).json({ message: 'Error en el servidor' });
        }
    }


    public async estusProyecto(req: Request, resp: Response) {
        const { idP } = req.params;
        await pool.query('UPDATE proyecto SET ? WHERE idP = ?', [req.body, idP]);
        resp.json({ message: 'Updating a Tarea ' + req.params.id });
    }

}

export const proyectsController = new ProyectsController();

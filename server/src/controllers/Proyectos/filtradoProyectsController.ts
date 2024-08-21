import { Request, Response } from 'express';
import pool from '../../database'


class FiltradoProyectosController {
    //Filtrado de tareas estatus
    public async proyectosActivos(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const [checar] = await pool.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1){
                const proyectos = await pool.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Activo"
                    ORDER BY fechaI
                    `, [idU]);
                resp.json(proyectos);
            } 
            else {

                if (checar) {  // Verificar si hay resultados
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Activo"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                } else {
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Activo"
                    ORDER BY fechaI`, [idU]);
                    resp.json(proyectos);
                }
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }


    public async proyectosBajaTemporal(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const [checar] = await pool.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1){
                const proyectos = await pool.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Baja Temporal"
                    ORDER BY fechaI
                    `, [idU]);
                resp.json(proyectos);
            } else {

                if (checar) {  // Verificar si hay resultados
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Baja Temporal"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                } else {
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Baja Temporal"
                    ORDER BY fechaI`, [idU]);
                    resp.json(proyectos);
                }
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }


    public async proyectosCancelados(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const [checar] = await pool.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1){
                const proyectos = await pool.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Cancelado"
                    ORDER BY fechaI
                    `, [idU]);
                resp.json(proyectos);
            } else {
                if (checar) {  // Verificar si hay resultados
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Cancelado"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                } else {
                    const proyectos = await pool.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Cancelado"
                    ORDER BY fechaI`, [idU]);
                    resp.json(proyectos);
                }
            }
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }
}

export const filtradoProyectosController = new FiltradoProyectosController();

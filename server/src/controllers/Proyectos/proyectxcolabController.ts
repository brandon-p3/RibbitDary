import { Request, Response } from 'express';
import pool from '../../database'


class ProyectxcolabController{
    public async list(req : Request, resp : Response){
        const proyectxcolab = await pool.query('SELECT * FROM proyectxcolab');
        resp.json(proyectxcolab);
        
    }
    public async listUP(req: Request, resp: Response) {
        const { idP } = req.params;
        try {
            const proyectos = await pool.query(`
                SELECT usuario.* 
                FROM proyectxcolab INNER JOIN usuario
                ON proyectxcolab.idColaborador = usuario.idU
                WHERE proyectxcolab.idP = ?
                `, [idP]);
            
            resp.json(proyectos);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving projects' });
        }
    }   

    public async getOne(req: Request, resp: Response) {
        const { idU, idP } = req.params;
    
        try {
            const query = `
                SELECT proyecto.*
                FROM proyecto
                LEFT JOIN proyectxcolab ON proyecto.idP = proyectxcolab.idP
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) OR (proyecto.idP = ? AND proyectxcolab.idColaboradores = ?)
            `;
    
            const result = await pool.query(query, [idP, idU, idP, idU]);
    
            if (result.length > 0) {
                resp.json(result[0]);
            } else {
                resp.status(404).json({ message: 'Proyecto no encontrado' });
            }
        } catch (error) {
            console.error('Error al obtener proyecto:', error);
            resp.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    
    

    public async create(req : Request, resp : Response): Promise<void>{
        console.log(req.body);
       await pool.query('INSERT INTO proyectxcolab SET ?', [req.body]);
        resp.json({message : 'Proyect Saved'});
    }
/*
    public async update(req : Request, resp : Response){
        const {idP} = req.params;
        await pool.query('UPDATE proyectxcolab SET ? WHERE idP =?', [req.body, idP]);
        resp.json({message:'Updating a proyectxcolab ' + req.params.id});
    }*/

        public async delete(req: Request, resp: Response): Promise<void> {
            const { idP, idColaborador } = req.params;
            
            try {
                const tareas = await pool.query('SELECT idT FROM tarea WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);
                if (tareas.length > 0) {
                    const idsTareas = tareas.map((tarea: any) => tarea.idT);
                    await pool.query('DELETE FROM material WHERE idT IN (?)', [idsTareas]);
                }
                await pool.query('DELETE FROM tarea WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);

                await pool.query('DELETE FROM proyectxcolab WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);
        
                resp.json({ message: 'proyectxcolab deleted and related materials removed' });
            } catch (error) {
                console.error('Error al borrar proyectxcolab y materiales:', error);
                resp.status(500).json({ message: 'Error al borrar proyectxcolab y materiales' });
            }
        }
        


}

export const proyectxcolabController = new ProyectxcolabController();

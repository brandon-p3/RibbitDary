import { Request, Response } from 'express';
import pool from '../../database'


class TipoProyectoController{
    public async proyectoTipo(req : Request, resp : Response){
        const {idType} = req.params;
        const tipoProyecto = await pool.query('SELECT * FROM tipoproyecto WHERE idType = ?', [idType]);
        resp.json(tipoProyecto);
    }

    public async getTipoProyecto(req : Request, resp : Response){
        const tipoProyecto = await pool.query('SELECT * FROM tipoproyecto WHERE idType != 0');
        resp.json(tipoProyecto);
    }
    
    public async create(req : Request, resp : Response){
        console.log(req.body);
        await pool.query('INSERT INTO tipoproyecto SET ?', [req.body]);
        resp.json({message: 'Tipo de proyecto creado'});
    }

    public async update(req : Request, resp : Response){
        const {idType} = req.params;
        await pool.query('UPDATE tipoproyecto SET ? WHERE idType = ?', [req.body, idType]);
        resp.json({message:'Tipo de proyecto actualizado'+ req.params.id});
    }

    public async delete(req: Request, resp: Response): Promise<void> {
        const { idType } = req.params;
        
        // Ejecutar la primera consulta
        await pool.query(`
            UPDATE proyecto SET idType = 0 WHERE idType = ?;
        `, [idType]);
        
        // Ejecutar la segunda consulta
        await pool.query(`
            DELETE FROM tipoproyecto WHERE idType = ?;
        `, [idType]);
    
        resp.json({ message: 'Tipo de proyecto eliminado ' + idType });
    }
    

}

export const tipoProyectoController = new TipoProyectoController();
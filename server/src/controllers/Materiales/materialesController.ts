import { Request, Response } from 'express';
import pool from '../../database'


class MatriealesController{
    public async list(req : Request, resp : Response){
        const material = await pool.query('SELECT * FROM material');
        resp.json(material);
        
    }
    public async getList(req: Request, resp: Response) {
        const { idT } = req.params;
        try {
            const material = await pool.query(`
                SELECT material.* 
                FROM material 
                WHERE material.idT = ?
                `, [idT]);
            
            resp.json(material);
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error retrieving material' });
        }
    }  
    
    public async create(req: Request, resp: Response) {
        try{
            await pool.query('INSERT INTO material SET ?', [req.body]);
            resp.json({ message: 'Material saved' });
        }catch(error){
            console.error(error);
            resp.status(500).json({ message: 'Error creating material' });
        }
    }

    public async delete(req: Request, resp: Response) {
        const {idMt} = req.params;
        try{
            await pool.query('DELETE FROM material WHERE idMt = ?', [idMt]);
            resp.json({ message: 'Material deleted' });
        }catch(err){{
            console.error(err);
            resp.status(500).json({ message: 'Error deleting material' });
        }
    }
    }

}

export const matriealesController = new MatriealesController();

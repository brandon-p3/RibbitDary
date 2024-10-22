import { Request, Response } from 'express';
import pool from "../../database";

class TajertaController{
    public async list(req: Request, resp: Response){
        const idU = req.params.idU;
        try{
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) { 
                const tarjeta = await pool.query('SELECT * FROM tarjeta');
                resp.json(tarjeta);
            }else{
                const tarjeta = await pool.query('SELECT * FROM tarjeta WHERE idU = ?', [idU]);
                resp.json(tarjeta);
            }
        }
        catch(error){
            console.log(error);
            resp.status(500).send('Error al obtener la tajerta');
            return;
        }
    }

    public async getOne(req: Request, resp: Response) {
        const {numTarjeta } = req.params;
        try {
            const tarjeta = await pool.query('SELECT * FROM tarjeta WHERE numTarjeta = ?', [numTarjeta]);
            if (tarjeta.length > 0) {
                resp.json(tarjeta[0]);
            } else {
                resp.status(404).json({ message: 'tarjeta no encontrada U' , numTarjeta});
            }
        } catch (error) {
            console.log(error);
            resp.status(500).send('Error al obtener la tarjeta');
        }
    }


    

    public async createTarjeta(req: Request, resp: Response){
        try{
            const tarjeta = await pool.query('INSERT INTO tarjeta SET ?', [req.body]);
            const numTarjeta = tarjeta.insertId;
            resp.json({ message: 'tarjeta guardada', numTarjeta : numTarjeta});
        }
        catch(error){
            console.log(error);
            resp.status(500).send('Error al guardar la tarjeta');
            return;
        }
    }

    public async updateTarjeta(req: Request, resp: Response){
        try{
            const { numTarjeta } = req.params;
            await pool.query('UPDATE tarjeta SET ? WHERE numTarjeta = ?', [req.body, numTarjeta]);
            resp.json({ message: 'tarjeta actualizada' });
        }
        catch(error){
            console.log(error);
            resp.status(500).send('Error al actualizar la tarjeta');
            return;
        }
    }

    public async deleteTarjeta(req: Request, resp: Response){
        try{
            const { numTarjeta } = req.params;
            await pool.query('DELETE FROM tarjeta WHERE numTarjeta = ?', [numTarjeta]);
            resp.json({ message: 'tarjeta eliminada' });
        }
        catch(error){
            console.log(error);
            resp.status(500).send('Error al eliminar la tarjeta');
            return;
        }
    }


}

export const tajertaController = new TajertaController();
import { Request, Response } from 'express';
import pool from "../../database";


class PaquetesController{
    public async listPaquetes(req: Request, res: Response){
        try{
        const paquetes = await pool.query('SELECT * FROM paquete');
        res.json(paquetes);

        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error en la petición'});
        }
    }

    public async obtenerPaquetePorId(req: Request, res: Response): Promise<void> {
        try {
            const { idPaquete } = req.params;
            const paquete = await pool.query('SELECT * FROM paquete WHERE idPaquete = ?', [idPaquete]);
            if (paquete.length > 0) {
                res.json(paquete[0]);
            } else {
                res.status(404).json({ message: 'Paquete no encontrado' });
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Error al obtener el paquete' });
        }
    }

    public async crearPaquetes(req: Request, res: Response){
        try{
            const paquete = req.body;
            const createP = await pool.query('INSERT INTO paquete SET ?', [paquete]);
            res.json({message: 'Paquete creado', createP});
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error en la creación'});
        }
    }

    public async eliminarPaquete(req: Request, res: Response){
        try{
            const {idPaquete} = req.params;
            const deleteP = await pool.query('DELETE FROM paquete WHERE idPaquete = ?', [idPaquete]);
            res.json({message: 'Paquete eliminado', deleteP});
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error en la eliminación'});
        }
    }

    public async actualizarPaquete(req: Request, res: Response){
        try{
            const {idPaquete} = req.params;
            const paquete = req.body;
            const updateP = await pool.query('UPDATE paquete SET ? WHERE idPaquete = ?', [paquete, idPaquete]);
            res.json({message: 'Paquete actualizado', updateP});
        }catch(err){
            console.log(err);
            res.status(500).json({message: 'Error en la actualización'});
        }
    }

}
export const paquetesController = new PaquetesController();
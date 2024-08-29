import { Request, Response } from 'express';
import pool from "../../database";

class DetallesPagoController{
    public async listDP(req: Request, res: Response){
        try{
            const idU = req.params.idU;
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const detalleP = await pool.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta`);
                res.json(detalleP);
             }else{
                const detalleP = await pool.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta
                    WHERE detallespago.idU = ?`, [idU]);
                res.json(detalleP);
             }
        }catch(error){
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }

    public async createDetalle(req: Request, res: Response){
        try{
            await pool.query('INSERT INTO detallespago SET?', [req.body]);
            res.json({message: 'Detalle de pago creado'});
        }catch(error){
            console.log(error);
            res.status(500).send('Error al insertar el detalle');
        }
    }

    public async deleteDetalle(req: Request, res: Response){
        try{
            const { idDetallePago } = req.params;
            await pool.query('DELETE FROM detallespago WHERE idDetallePago =?', [idDetallePago]);
            res.json({message: 'Detalle de pago eliminado'});
        }catch(error){
            console.log(error);
            res.status(500).send('Error al eliminar el detalle');
        }
    }

    public async updateDetalle(req: Request, res: Response){
        try{
            const { idDetallePago } = req.params;
            await pool.query('UPDATE detallespago SET ? WHERE idDetallePago = ?', [req.body, idDetallePago]);
            res.json({message: 'Detalle de pago actualizado'});
        }catch(error){
            console.log(error);
            res.status(500).send('Error al actualizar el detalle');
        }
    }
}

export const detallesPagoController = new DetallesPagoController();
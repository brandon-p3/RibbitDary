import { Request, Response} from "express";
import pool from '../../database'


class TipoProyectoController{
    public async proyectoTipo(req : Request, resp : Response){
        const {idType} = req.params;
        const tipoProyecto = await pool.query('SELECT * FROM tipoproyecto WHERE idType = ?', [idType]);
        resp.json(tipoProyecto);
    }
}

export const tipoProyectoController = new TipoProyectoController();
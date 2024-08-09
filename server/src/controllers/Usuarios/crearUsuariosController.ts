import { Request, Response } from "express";
import pool from "../../database";
import bcrypt from 'bcryptjs';

class CrearUsuarioController {
    public async create(req: Request, resp: Response) {
        try {
            const { password, ...userData } = req.body;
            if (!password) {
                return resp.status(400).json({ messege: 'password is required' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);

            await pool.query(
                'INSERT INTO usuario SET ?',
                [{ ...userData, password: hashedPassword }]
            );
            resp.json({ messege: 'usuario agregado' })
        }
        catch (error) {
            console.error('error al gaurdar el usuario', error);
            resp.status(500).json({ messege: 'error al guardar el usuario ' })
        }







    }


}

export const crearUsuarioController = new CrearUsuarioController();
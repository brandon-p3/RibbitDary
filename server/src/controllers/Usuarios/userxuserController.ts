import { Request, Response } from 'express';
import pool from '../../database';

class UserxuserController {
    public async getUserxuser(req: Request, res: Response): Promise<void> {
        const { idU } = req.params;
        try {

            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const userxuser = await pool.query(`SELECT * FROM usuario`);
                res.json(userxuser);
            } 

            else if (user.length > 0 && user[0].idTipo === 3) {
                const result = await pool.query('SELECT idU FROM userxuser WHERE idColaborador = ?', [idU]);
    
                    const id = result[0].idU; 
                    const userxuser = await pool.query(`
                        SELECT usuario.* FROM usuario
                        INNER JOIN userxuser 
                        ON userxuser.idColaborador = usuario.idU
                        WHERE userxuser.idU = ?
                    `, [id]);
                    
                    res.json(userxuser);     
            } 
            else {
                const userxuser = await pool.query(`
                SELECT usuario.* FROM usuario
                INNER JOIN userxuser 
                ON userxuser.idColaborador = usuario.idU
                WHERE userxuser.idU = ?
            `, [idU]);
                res.json(userxuser);
            }
        } catch (error) {
            console.error('Error al obtener usuarios:', error);
            res.status(500).json({ message: 'Error al obtener usuarios' });
        }
    }

    public async createUserxUser(req: Request, res: Response) {
        try {
            await pool.query('INSERT INTO userxuser SET ?', [req.body]);
            res.json({ message: 'userxuser' });
        }
        catch (error) {
            console.error('Error al crear userxuser', error);
            res.status(500).json({ message: 'Error al crear usuario' });
        }
    }

    public async deleteUserxUser(req: Request, resp: Response) {
        const { idColaborador } = req.params;
        try {
            await pool.query('UPDATE tarea SET idColaborador = 0 WHERE idColaborador = ? ', [idColaborador]);
            await pool.query('DELETE FROM proyectxcolab WHERE idColaborador = ? ', [idColaborador]);
            await pool.query('DELETE FROM userxuser WHERE idColaborador = ?', [idColaborador]);
            await pool.query('DELETE FROM usuario WHERE idU = ? ', [idColaborador]);

            resp.json({ message: 'Socio deleted' });
        }
        catch (error) {
            console.error('Error al borrar socio', error);
            resp.status(500).json({ message: 'Error al crear usuario' });
        }
    }

    public async getOne(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
          const usuario = await pool.query(`
                    SELECT usuario.* 
                    FROM usuario 
                    WHERE usuario.idU = ?
                    `, [idU]);
    
          resp.json(usuario);
        } catch (error) {
          console.error(error);
          resp.status(500).json({ message: 'Error retrieving usuario' });
        }
      }

}

export const userxuserController = new UserxuserController();

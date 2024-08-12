import { Request, Response } from "express";
import pool from "../../database";
import bcrypt from 'bcryptjs';

class UsuarioController {
  public async list(req: Request, resp: Response) {
    const usuario = await pool.query('SELECT * FROM usuario');
    resp.json(usuario);

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

  public async getOneEdit(req: Request, resp: Response) {
    const { idU } = req.params;
    try {
      const usuario = await pool.query(`
                SELECT usuario.* 
                FROM usuario 
                WHERE usuario.idU = ?
                `, [idU]);

      if (usuario.length > 0) {
        resp.json(usuario[0]);
    } else {
        resp.status(404).json({ usuario: 'Tarea not found' });
    }
    } catch (error) {
      console.error(error);
      resp.status(500).json({ message: 'Error retrieving usuario' });
    }
  }

  public async create(req: Request, resp: Response) {
    try {
      const { password, ...userData } = req.body;
      if (!password) {
        return resp.status(400).json({ message: 'Password is required' });
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Guardar el usuario con la contraseña hasheada
     const result = await pool.query(
        'INSERT INTO usuario SET ?',
        [{ ...userData, password: hashedPassword }]
      );

      const idU = result.insertId;

      resp.json({ message: 'Usuario guardado', idU: idU });
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      resp.status(500).json({ message: 'Error al guardar el usuario' });
    }
  }

  public async update(req: Request, resp: Response) {
    const { idU } = req.params;
    await pool.query(
      'update usuario set ? where idU= ?', [req.body, idU]);
    resp.json({ message: 'se actualizo el usuario' + req.params.idU });
  }

  public async delete(req: Request, resp: Response) {
    const { idU } = req.params;
    try {
      await pool.query('delete from userxuser  where idU = ?', [idU]);
      await pool.query('delete from usuario  where idU = ?', [idU]);

    } catch (err) {
      resp.json({ message: 'se elimino el usuario' + req.params.idU });
    }

  }
}

export const usuarioController = new UsuarioController();
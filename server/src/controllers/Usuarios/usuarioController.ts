import { Request, Response } from 'express';
import pool from "../../database";
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

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

  public async getUserStream(req: Request, resp: Response) {
    const { idU } = req.params;
    try {
      let usuario: any[] = [];
  
      const userResult = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
      const user = userResult[0]; 
  
      if (user && user.idTipo === 3) {
        const colaboradorResult = await pool.query(`
          SELECT usuario.* 
          FROM usuario 
          INNER JOIN userxuser ON usuario.idU = userxuser.idU 
          WHERE userxuser.idColaborador = ?`, 
          [idU]
        );
        usuario = colaboradorResult;
      } else {
        const usuarioResult = await pool.query(`
          SELECT usuario.* 
          FROM usuario 
          WHERE usuario.idU = ?`, 
          [idU]
        );
        usuario = usuarioResult;
      }
      if (usuario.length > 0) {
        resp.json(usuario[0]);
      } else {
        resp.status(404).json({ message: 'Usuario not found' });
      }
    } catch (error) {
      console.error(error);
      resp.status(500).json({ message: 'Error retrieving usuario' });
    }
  }

  public async create(req: Request, resp: Response) {
    try {
      const { password, usuario, ...userData } = req.body; 
      if (!password || !usuario) {
        return resp.status(400).json({ message: 'Password and email are required' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await pool.query(
        'INSERT INTO usuario SET ?',
        [{ ...userData, usuario: usuario, password: hashedPassword }]
      );

      const idU = result.insertId;

      resp.json({ message: 'Usuario guardado, verifica tu correo para activar tu cuenta', idU: idU });
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      resp.status(500).json({ message: 'Error al guardar el usuario' });
    }
  }


  public async update(req: Request, resp: Response) {
    const { idU } = req.params;
    await pool.query('UPDATE usuario SET ? WHERE idU = ?', [req.body, idU]);
    resp.json({ message: 'Updating a usuario ' + req.params.id });
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
  public async ubicacion(req: Request, resp: Response) {
    const { idU } = req.params;
    await pool.query('UPDATE usuario SET ? WHERE idU = ?', [req.body, idU]);
    resp.json({ message: 'Updating a ubicacion del usuario ' + req.params.id });
  }

  public async updatePassword(req: Request, resp: Response) {
    try {
      const { idU } = req.params;
      const { password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      await pool.query(
        'UPDATE usuario SET password = ? WHERE idU = ?',
        [hashedPassword, idU]
      );

      resp.json({ message: 'Se actualizó el usuario con ID ' + idU });
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      resp.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }

  public async updateTwitch(req: Request, resp: Response) {
    try {
      const { idU } = req.params;
      const { userIdTwitch } = req.body;

      await pool.query(
        'UPDATE usuario SET userIdTwitch = ? WHERE idU = ?',
        [userIdTwitch, idU]
      );

      resp.json({ message: 'Se actualizó el usuario con ID ' + idU });
    } catch (error) {
      console.error('Error al actualizar el usuario', error);
      resp.status(500).json({ message: 'Error al actualizar el usuario' });
    }
  }


}
export const usuarioController = new UsuarioController();
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

  public async create(req: Request, resp: Response) {
    try {
      const { password, email, ...userData } = req.body; // Asegúrate de incluir el email
      if (!password || !email) {
        return resp.status(400).json({ message: 'Password and email are required' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = crypto.randomBytes(32).toString('hex'); // Genera un token

      // Guardar el usuario con la contraseña hasheada y el token
      const result = await pool.query(
        'INSERT INTO usuario SET ?',
        [{ ...userData, password: hashedPassword, email_verified: false, verification_token: verificationToken }]
      );

      const idU = result.insertId;

      // Enviar el correo de verificación
      await this.enviarCorreoVerificacion(email, verificationToken);

      resp.json({ message: 'Usuario guardado, verifica tu correo para activar tu cuenta', idU: idU });
    } catch (error) {
      console.error('Error al guardar el usuario', error);
      resp.status(500).json({ message: 'Error al guardar el usuario' });
    }
  }

  private async enviarCorreoVerificacion(email: string, token: string) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Cambia esto según tu servicio de correo
      port: 587,
      secure: false,
      auth: {
        user: 'ribbitdary@gmail.com', // Cambia por tu correo
        pass: 'hrie xpbp tffu qwglv' // Cambia por tu contraseña
      }
    });

    const verificationUrl = `http://tusitio.com/verificar/${token}`; // Cambia esto según tu dominio

    await transporter.sendMail({
      from: '"Verificación de Correo" <tucorreo@gmail.com>', // Cambia por tu correo
      to: email,
      subject: 'Verifica tu correo',
      html: `<p>Haz clic en el siguiente enlace para verificar tu correo:</p><a href="${verificationUrl}">Verificar Correo</a>`
    });
  }

  public async verificarCorreo(req: Request, resp: Response) {
    const { token } = req.params;

    try {
      const result = await pool.query('SELECT * FROM usuario WHERE verification_token = ?', [token]);

      if (result.length > 0) {
        await pool.query('UPDATE usuario SET email_verified = true, verification_token = NULL WHERE verification_token = ?', [token]);
        resp.json({ message: 'Correo verificado exitosamente' });
      } else {
        resp.status(400).json({ message: 'Token de verificación inválido' });
      }
    } catch (error) {
      console.error(error);
      resp.status(500).json({ message: 'Error al verificar el correo' });
    }
  }

  // Método para autenticar al usuario
  public async authenticate(req: Request, resp: Response) {
    const { usuario, password } = req.body;

    try {
      const result = await pool.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);

      if (result.length > 0) {
        const user = result[0];

        // Verifica si el correo electrónico está confirmado
        if (!user.email_verified) {
          return resp.status(403).json({ message: 'Debes verificar tu correo electrónico' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
          // Lógica de inicio de sesión
          resp.json({ message: 'Inicio de sesión exitoso' });
        } else {
          resp.status(401).json({ message: 'Credenciales incorrectas' });
        }
      } else {
        resp.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error(error);
      resp.status(500).json({ message: 'Error en la autenticación' });
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

}
export const usuarioController = new UsuarioController();
import { Request, Response } from 'express';
import pool from '../../database';
import nodemailer from 'nodemailer';

class CorreoController {

    public async tareasUrgentes(req: Request, resp: Response) {
        const { idU } = req.params;
        try {
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
    
            if (user.length > 0 && user[0].idTipo === 1) {
                const tareas = await pool.query(`
                    SELECT u.nombres, u.usuario, t.nomTarea, 
                    (SELECT us.nombres FROM usuario as us WHERE t.idColaborador = us.idU) as Socio_Nombre 
                    FROM usuario as u 
                    INNER JOIN tarea as t ON u.idU = t.idU 
                    WHERE DATEDIFF(t.fechaF, CURDATE()) < 10 
                    AND DATEDIFF(t.fechaF, CURDATE()) >= 0 
                    AND t.estatus != "Terminada";
                `);
    
                const transporter = nodemailer.createTransport({
                    host: 'smtp.gmail.com',
                    port: 465,
                    secure: true, // Para conectarse con TLS/SSL
                    auth: {
                        user: 'ribbitdary@gmail.com', // Coloca tu email
                        pass: 'wlyy byeu dqti ynyj',
                    },
                    tls: {
                        rejectUnauthorized: false
                    }
                });
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                // Iteramos sobre las tareas para enviar un correo a cada usuario con tareas urgentes
                for (const tarea of tareas) {
                    const email = tarea.usuario; // Email del usuario

                    // Validar el formato del correo electrónico
                    if (!emailRegex.test(email)) {
                        console.error(`El correo ${email} no es válido para el usuario ${tarea.nombres}`);
                        continue; // Si el correo no es válido, continuar con la siguiente tarea
                    }
                    const asunto = "Tu tarea está por terminar"; // Asunto del correo
                    const mensaje = `Hola ${tarea.nombres},\n\nTu tarea "${tarea.nomTarea}" está por expirar. Por favor, asegúrate de completarla antes de la fecha de vencimiento.\n\nSaludos,\nRibbitDary`; // Mensaje personalizado con la tarea
    
                    const mailOptions = {
                        from: 'RibbitDary', // Remitente
                        to: email, // Destinatario
                        subject: asunto, // Asunto del correo
                        text: mensaje, // Contenido del mensaje en texto plano
                    };
    
                    await transporter.sendMail(mailOptions);
                }
    
                resp.status(200).json({ message: 'Correos enviados exitosamente' });
            } 
        } catch (error) {
            console.error(error);
            resp.status(500).json({ message: 'Error al obtener las tareas urgentes' });
        }
    }

    public async enviarCorreo(req: Request, res: Response) {
        const { email, asunto, mensaje } = req.body;
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true, // Para conectarse con TLS/SSL
                auth: {
                    user: 'ribbitdary@gmail.com', // Coloca tu email
                    pass: 'wlyy byeu dqti ynyj',
                },
                tls: {
                    rejectUnauthorized: false
                }
            });

            const mailOptions = {
                from: 'RibbitDary', // Remitente
                to: email, // Destinatario
                subject: asunto, // Asunto del correo
                text: mensaje, // Contenido del mensaje en texto plano
            };
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Correo enviado exitosamente' });
        } catch (error) {
            console.error('Error enviando correo:', error); // Log del error
            throw new Error("Error al enviar correo."); // Asegúrate de que se propaga el error
        }
    }

}

export const correoController = new CorreoController();

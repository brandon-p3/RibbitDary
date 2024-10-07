import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

class CorreoController {

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

import { Request, Response } from 'express';
import pool from "../../database";
import nodemailer from 'nodemailer';

class DetallesPagoController {
    public async listDP(req: Request, res: Response) {
        try {
            const idU = req.params.idU;
            const user: any[] = await pool.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);

            if (user.length > 0 && user[0].idTipo === 1) {
                const detalleP = await pool.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta`);
                res.json(detalleP);
            } else {
                const detalleP = await pool.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta
                    WHERE detallespago.idU = ?`, [idU]);
                res.json(detalleP);
            }
        } catch (error) {
            console.log(error);
            res.status(500).send('Error en el servidor');
        }
    }

    public async createDetalle(req: Request, res: Response) {
        try {
            const idU = req.params.idU;
    
            // Consultar datos del usuario
            const user: any[] = await pool.query('SELECT idTipo, usuario, nombres FROM usuario WHERE idU = ?', [idU]);
    
            // Actualizar a 'Inactivo' los pagos anteriores
            const updateResult: any = await pool.query(
                'UPDATE detallespago SET estatus = ? WHERE idU = ?',
                ['Inactivo', idU]
            );
    
            // Verificar si se actualizaron los pagos anteriores
            if (updateResult.affectedRows === 0) {
                return res.status(400).json({ message: 'No se pudo actualizar el estado de los pagos anteriores' });
            }
    
            // Insertar el nuevo detalle de pago
            const insertResult: any = await pool.query('INSERT INTO detallespago SET ?', [req.body]);
    
            // Obtener el ID del detalle de pago recién insertado
            const idDetallePago = insertResult.insertId;
    
            // Si el usuario es tipo 3, actualizarlo a tipo 2
            if (user.length > 0 && user[0].idTipo === 3) {
                await pool.query('UPDATE usuario SET idTipo = 2 WHERE idU = ?', [idU]);
            }
    
            // Obtener el detalle del pago recién insertado
            const detallePago: any[] = await pool.query(
                `SELECT p.namePaquete, p.precio, dp.create_time, dp.fechaF 
                 FROM detallespago dp
                 INNER JOIN paquete p ON dp.idPaquete = p.idPaquete
                 WHERE dp.idDetallePago = ?`, [idDetallePago]
            );
    
            if (detallePago.length === 0) {
                return res.status(404).json({ message: 'No se encontró el detalle de pago' });
            }
    
            const { namePaquete, precio, create_time, fechaF } = detallePago[0];
            const { usuario, nombres } = user[0];
    
            // Configuración del transporte para nodemailer
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'ribbitdary@gmail.com',
                    pass: 'wlyy byeu dqti ynyj', // Contraseña de aplicación
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });
    
            const asunto = "¡Pago realizado con éxito!";
            const mensajeHTML = `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Confirmación de Pago</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        margin: 0;
                        padding: 0;
                    }
                    .container {
                        max-width: 600px;
                        margin: 50px auto;
                        background-color: #ffffff;
                        border-radius: 8px;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        padding: 20px;
                    }
                    .header {
                        background-color: #4caf50;
                        color: #fff;
                        padding: 20px;
                        text-align: center;
                        border-top-left-radius: 8px;
                        border-top-right-radius: 8px;
                    }
                    h1 {
                        margin: 0;
                        font-size: 24px;
                    }
                    .content {
                        padding: 20px;
                        line-height: 1.6;
                        color: #333;
                    }
                    .content p {
                        margin: 10px 0;
                    }
                    .highlight {
                        font-weight: bold;
                        color: #4caf50;
                    }
                    .footer {
                        text-align: center;
                        padding: 10px;
                        background-color: #f4f4f4;
                        border-top: 1px solid #e0e0e0;
                        color: #888;
                        font-size: 12px;
                        border-bottom-left-radius: 8px;
                        border-bottom-right-radius: 8px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>¡Pago realizado con éxito!</h1>
                    </div>
                    <div class="content">
                        <p>Hola <span class="highlight">${nombres}</span>,</p>
                        <p>¡Gracias por tu pago! Aquí tienes los detalles de tu paquete:</p>
                        <ul>
                            <li><strong>Paquete:</strong> ${namePaquete}</li>
                            <li><strong>Costo:</strong> $${precio}</li>
                            <li><strong>Fecha de Pago:</strong> ${new Date(create_time).toLocaleDateString()}</li>
                            <li><strong>Fecha de Expiración:</strong> ${new Date(fechaF).toLocaleDateString()}</li>
                        </ul>
                        <p>Esperamos que disfrutes de todos los beneficios que este paquete ofrece, la 
                        familia RibbitDary te lo agradece de todo korason.</p>
                       
                    </div>
                    <div class="footer">
                        <p>Gracias por confiar en RibbitDary.</p>
                        <p>&copy; 2024 RibbitDary - Todos los derechos reservados.</p>
                    </div>
                </div>
            </body>
            </html>
            `;
            
            const mailOptions = {
                from: 'RibbitDary <ribbitdary@gmail.com>',
                to: usuario,
                subject: '¡Pago realizado con éxito!',
                html: mensajeHTML, // Usamos el HTML en lugar de texto plano
            };            
    
            // Enviar el correo de confirmación
            await transporter.sendMail(mailOptions);
    
            res.status(200).json({ message: 'Detalle de pago creado y correo enviado exitosamente' });
        } catch (error) {
            console.error(error);
            res.status(500).send('Error al insertar el detalle de pago');
        }
    }
    
    public async deleteDetalle(req: Request, res: Response) {
        try {
            const { idDetallePago } = req.params;
            await pool.query('DELETE FROM detallespago WHERE idDetallePago =?', [idDetallePago]);
            res.json({ message: 'Detalle de pago eliminado' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al eliminar el detalle');
        }
    }

    public async updateDetalle(req: Request, res: Response) {
        try {
            const { idDetallePago } = req.params;
            await pool.query('UPDATE detallespago SET ? WHERE idDetallePago = ?', [req.body, idDetallePago]);
            res.json({ message: 'Detalle de pago actualizado' });
        } catch (error) {
            console.log(error);
            res.status(500).send('Error al actualizar el detalle');
        }
    }
}

export const detallesPagoController = new DetallesPagoController();
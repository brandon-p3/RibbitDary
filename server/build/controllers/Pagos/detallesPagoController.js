"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.detallesPagoController = void 0;
const database_1 = __importDefault(require("../../database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class DetallesPagoController {
    listDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const detalleP = yield database_1.default.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta`);
                    res.json(detalleP);
                }
                else {
                    const detalleP = yield database_1.default.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta
                    WHERE detallespago.idU = ?`, [idU]);
                    res.json(detalleP);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
    createDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                // Consultar datos del usuario
                const user = yield database_1.default.query('SELECT idTipo, usuario, nombres FROM usuario WHERE idU = ?', [idU]);
                // Verificar si hay pagos anteriores
                const pagosAnteriores = yield database_1.default.query('SELECT * FROM detallespago WHERE idU = ? AND estatus = "Activo"', [idU]);
                // Actualizar a 'Inactivo' los pagos anteriores solo si existen
                if (pagosAnteriores.length > 0) {
                    const updateResult = yield database_1.default.query('UPDATE detallespago SET estatus = ? WHERE idU = ?', ['Inactivo', idU]);
                    if (updateResult.affectedRows === 0) {
                        return res.status(400).json({ message: 'No se pudo actualizar el estado de los pagos anteriores' });
                    }
                }
                // Insertar el nuevo detalle de pago
                const insertResult = yield database_1.default.query('INSERT INTO detallespago SET ?', [req.body]);
                // Obtener el ID del detalle de pago recién insertado
                const idDetallePago = insertResult.insertId;
                // Si el usuario es tipo 3, actualizarlo a tipo 2
                if (user.length > 0 && user[0].idTipo === 3) {
                    yield database_1.default.query('UPDATE usuario SET idTipo = 2 WHERE idU = ?', [idU]);
                }
                // Obtener el detalle del pago recién insertado
                const detallePago = yield database_1.default.query(`SELECT p.namePaquete, p.precio, dp.create_time, dp.fechaF 
                 FROM detallespago dp
                 INNER JOIN paquete p ON dp.idPaquete = p.idPaquete
                 WHERE dp.idDetallePago = ?`, [idDetallePago]);
                if (detallePago.length === 0) {
                    return res.status(404).json({ message: 'No se encontró el detalle de pago' });
                }
                const { namePaquete, precio, create_time, fechaF } = detallePago[0];
                const { usuario, nombres } = user[0];
                // Configuración del transporte para nodemailer
                const transporter = nodemailer_1.default.createTransport({
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
                const mensajeHTML = `
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <style>
                    body { font-family: 'Arial', sans-serif; background-color: #f4f4f4; }
                    .container { max-width: 600px; margin: 50px auto; padding: 20px; }
                    .header { background-color: #4caf50; color: white; text-align: center; padding: 20px; }
                    .content { padding: 20px; }
                    .highlight { font-weight: bold; color: #4caf50; }
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
                    </div>
                </div>
            </body>
            </html>
            `;
                const mailOptions = {
                    from: 'RibbitDary <ribbitdary@gmail.com>',
                    to: usuario,
                    subject: '¡Pago realizado con éxito!',
                    html: mensajeHTML,
                };
                // Enviar correo de confirmación
                yield transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Detalle de pago creado y correo enviado exitosamente' });
            }
            catch (error) {
                console.error(error);
                res.status(500).send('Error al insertar el detalle de pago');
            }
        });
    }
    deleteDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idDetallePago } = req.params;
                yield database_1.default.query('DELETE FROM detallespago WHERE idDetallePago =?', [idDetallePago]);
                res.json({ message: 'Detalle de pago eliminado' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error al eliminar el detalle');
            }
        });
    }
    updateDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idDetallePago } = req.params;
                yield database_1.default.query('UPDATE detallespago SET ? WHERE idDetallePago = ?', [req.body, idDetallePago]);
                res.json({ message: 'Detalle de pago actualizado' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error al actualizar el detalle');
            }
        });
    }
}
exports.detallesPagoController = new DetallesPagoController();

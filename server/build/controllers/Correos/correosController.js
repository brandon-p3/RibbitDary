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
exports.correoController = void 0;
const database_1 = __importDefault(require("../../database"));
const nodemailer_1 = __importDefault(require("nodemailer"));
class CorreoController {
    tareasUrgentes(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const tareas = yield database_1.default.query(`
                    SELECT u.nombres, u.usuario, t.nomTarea, 
                    (SELECT us.nombres FROM usuario as us WHERE t.idColaborador = us.idU) as Socio_Nombre 
                    FROM usuario as u 
                    INNER JOIN tarea as t ON u.idU = t.idU 
                    WHERE DATEDIFF(t.fechaF, CURDATE()) < 10 
                    AND DATEDIFF(t.fechaF, CURDATE()) >= 0 
                    AND t.estatus != "Terminada"; 
                `);
                    const transporter = nodemailer_1.default.createTransport({
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
                        yield transporter.sendMail(mailOptions);
                    }
                    resp.status(200).json({ message: 'Correos enviados exitosamente' });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al obtener las tareas urgentes' });
            }
        });
    }
    enviarCorreo(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, asunto, mensaje } = req.body;
            try {
                const transporter = nodemailer_1.default.createTransport({
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
                yield transporter.sendMail(mailOptions);
                res.status(200).json({ message: 'Correo enviado exitosamente' });
            }
            catch (error) {
                console.error('Error enviando correo:', error); // Log del error
                throw new Error("Error al enviar correo."); // Asegúrate de que se propaga el error
            }
        });
    }
}
exports.correoController = new CorreoController();

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
const nodemailer_1 = __importDefault(require("nodemailer"));
class CorreoController {
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

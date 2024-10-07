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
    constructor() {
        // Configuración de Nodemailer
        this.transporter = nodemailer_1.default.createTransport({
            service: 'gmail', // Usa el servicio de correo que prefieras
            auth: {
                user: 'ribbitdary@gmail.com', // Coloca tu email
                pass: 'hrie xpbp tffu qwglv', // Coloca tu contraseña
            },
        });
    }
    enviarCorreo(destinatario, asunto, mensaje) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.transporter.sendMail({
                    from: '"Tareas Pendientes" <ribbitdary@gmail.com>', // Remitente
                    to: destinatario, // Destinatario
                    subject: asunto, // Asunto del correo
                    text: mensaje, // Contenido del mensaje en texto plano
                });
            }
            catch (error) {
                console.error('Error enviando correo:', error);
            }
        });
    }
    pruebaEnvioCorreo(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, asunto, mensaje } = req.body;
            // Validar que los campos existan en la solicitud
            if (!email || !asunto || !mensaje) {
                resp.status(400).json({ message: 'Faltan datos para enviar el correo' });
                return;
            }
            // Enviar el correo
            yield this.enviarCorreo(email, asunto, mensaje);
            // Confirmación de éxito
            resp.status(200).json({ message: `Correo enviado a ${email}` });
        });
    }
}
exports.correoController = new CorreoController();

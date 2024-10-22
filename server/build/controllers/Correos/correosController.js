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
                    SELECT u.nombres, u.usuario, t.nomTarea, t.fechaF, t.idT, t.idU, t.idP,
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
                        const mensaje = `
                    <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Recordatorio de Tarea</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #e8f5e9;
      font-family: 'Arial', sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 50px auto;
      background-color: #ffffff;
      border-radius: 12px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header {
      background-color: #388e3c;
      padding: 20px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 28px;
      letter-spacing: 1px;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.8;
    }
    .content strong {
      color: #2e7d32;
    }
    .btn {
      display: block;
      width: 60%;
      margin: 20px auto;
      padding: 15px;
      text-align: center;
      background-color: #4caf50;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: bold;
      transition: background-color 0.3s;
    }
    .btn:hover {
      background-color: #388e3c;
    }
    .footer {
      background-color: #f1f8e9;
      padding: 15px;
      text-align: center;
      color: #757575;
      font-size: 14px;
    }
    .a{
    text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Recordatorio de Tarea</h1>
    </div>
    <div class="content">
      <p>Hola <strong>${tarea.nombres}</strong>,</p>

      <p>Queremos recordarte que tu tarea <strong>"${tarea.nomTarea}"</strong> está próxima a expirar.</p>

      <p><strong>Fecha límite:</strong> ${tarea.fechaF}</p>

      <p>Te recomendamos completarla a tiempo para evitar inconvenientes. Si necesitas asistencia, no dudes en contactarnos.</p>

      <a href="http://localhost:4200/tarea/${tarea.idU}/${tarea.idP}/${tarea.idT}" class="btn">Ver Tarea</a>
    </div>
    <div class="footer">
      <p>Saludos cordiales,</p>
      <p><strong>Equipo RibbitDary</strong></p>
    </div>
  </div>
</body>
</html>

                    `;
                        const mailOptions = {
                            from: 'RibbitDary', // Remitente
                            to: email, // Destinatario
                            subject: asunto, // Asunto del correo
                            html: mensaje, // Contenido del mensaje en texto plano
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
                    html: mensaje, // Contenido del mensaje en texto plano
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

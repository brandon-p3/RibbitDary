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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioController = void 0;
const database_1 = __importDefault(require("../../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const crypto_1 = __importDefault(require("crypto"));
class UsuarioController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const usuario = yield database_1.default.query('SELECT * FROM usuario');
            resp.json(usuario);
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const usuario = yield database_1.default.query(`
                SELECT usuario.* 
                FROM usuario 
                WHERE usuario.idU = ?
                `, [idU]);
                resp.json(usuario);
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving usuario' });
            }
        });
    }
    getOneEdit(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const usuario = yield database_1.default.query(`
                SELECT usuario.* 
                FROM usuario 
                WHERE usuario.idU = ?
                `, [idU]);
                if (usuario.length > 0) {
                    resp.json(usuario[0]);
                }
                else {
                    resp.status(404).json({ usuario: 'Tarea not found' });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving usuario' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { password, email } = _a, userData = __rest(_a, ["password", "email"]); // Asegúrate de incluir el email
                if (!password || !email) {
                    return resp.status(400).json({ message: 'Password and email are required' });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const verificationToken = crypto_1.default.randomBytes(32).toString('hex'); // Genera un token
                // Guardar el usuario con la contraseña hasheada y el token
                const result = yield database_1.default.query('INSERT INTO usuario SET ?', [Object.assign(Object.assign({}, userData), { password: hashedPassword, email_verified: false, verification_token: verificationToken })]);
                const idU = result.insertId;
                // Enviar el correo de verificación
                yield this.enviarCorreoVerificacion(email, verificationToken);
                resp.json({ message: 'Usuario guardado, verifica tu correo para activar tu cuenta', idU: idU });
            }
            catch (error) {
                console.error('Error al guardar el usuario', error);
                resp.status(500).json({ message: 'Error al guardar el usuario' });
            }
        });
    }
    enviarCorreoVerificacion(email, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const transporter = nodemailer_1.default.createTransport({
                host: 'smtp.gmail.com', // Cambia esto según tu servicio de correo
                port: 587,
                secure: false,
                auth: {
                    user: 'ribbitdary@gmail.com', // Cambia por tu correo
                    pass: 'hrie xpbp tffu qwglv' // Cambia por tu contraseña
                }
            });
            const verificationUrl = `http://tusitio.com/verificar/${token}`; // Cambia esto según tu dominio
            yield transporter.sendMail({
                from: '"Verificación de Correo" <tucorreo@gmail.com>', // Cambia por tu correo
                to: email,
                subject: 'Verifica tu correo',
                html: `<p>Haz clic en el siguiente enlace para verificar tu correo:</p><a href="${verificationUrl}">Verificar Correo</a>`
            });
        });
    }
    verificarCorreo(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { token } = req.params;
            try {
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE verification_token = ?', [token]);
                if (result.length > 0) {
                    yield database_1.default.query('UPDATE usuario SET email_verified = true, verification_token = NULL WHERE verification_token = ?', [token]);
                    resp.json({ message: 'Correo verificado exitosamente' });
                }
                else {
                    resp.status(400).json({ message: 'Token de verificación inválido' });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al verificar el correo' });
            }
        });
    }
    // Método para autenticar al usuario
    authenticate(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { usuario, password } = req.body;
            try {
                const result = yield database_1.default.query('SELECT * FROM usuario WHERE usuario = ?', [usuario]);
                if (result.length > 0) {
                    const user = result[0];
                    // Verifica si el correo electrónico está confirmado
                    if (!user.email_verified) {
                        return resp.status(403).json({ message: 'Debes verificar tu correo electrónico' });
                    }
                    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
                    if (isMatch) {
                        // Lógica de inicio de sesión
                        resp.json({ message: 'Inicio de sesión exitoso' });
                    }
                    else {
                        resp.status(401).json({ message: 'Credenciales incorrectas' });
                    }
                }
                else {
                    resp.status(404).json({ message: 'Usuario no encontrado' });
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error en la autenticación' });
            }
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            yield database_1.default.query('UPDATE usuario SET ? WHERE idU = ?', [req.body, idU]);
            resp.json({ message: 'Updating a usuario ' + req.params.id });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                yield database_1.default.query('delete from userxuser  where idU = ?', [idU]);
                yield database_1.default.query('delete from usuario  where idU = ?', [idU]);
            }
            catch (err) {
                resp.json({ message: 'se elimino el usuario' + req.params.idU });
            }
        });
    }
    ubicacion(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            yield database_1.default.query('UPDATE usuario SET ? WHERE idU = ?', [req.body, idU]);
            resp.json({ message: 'Updating a ubicacion del usuario ' + req.params.id });
        });
    }
    updatePassword(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idU } = req.params;
                const { password } = req.body;
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                yield database_1.default.query('UPDATE usuario SET password = ? WHERE idU = ?', [hashedPassword, idU]);
                resp.json({ message: 'Se actualizó el usuario con ID ' + idU });
            }
            catch (error) {
                console.error('Error al actualizar el usuario', error);
                resp.status(500).json({ message: 'Error al actualizar el usuario' });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();

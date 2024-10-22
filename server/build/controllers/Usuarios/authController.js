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
exports.authController = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const database_1 = __importDefault(require("../../database")); // Asegúrate de que esta ruta sea correcta
const axios_1 = __importDefault(require("axios"));
class AuthController {
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { correo, password } = req.body;
            try {
                // Buscar al usuario en la base de datos
                const [user] = yield database_1.default.query('SELECT * FROM usuario WHERE usuario = ?', [correo]);
                if (!user) {
                    return res.status(401).json({ message: 'Usuario no encontrado' });
                }
                const coinciden = yield bcryptjs_1.default.compare(password, user.password);
                if (!coinciden) {
                    return res.status(401).json({ message: 'Contraseña incorrecta' });
                }
                // Autenticación exitosa
                res.json({ message: 'Login exitoso', userId: user.idU });
            }
            catch (error) {
                console.error('Error en el login:', error);
                res.status(500).json({ message: 'Error en el servidor' });
            }
        });
    }
    loginWithFacebook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fbToken } = req.body;
            try {
                // Verifica el token con la API de Facebook, incluyendo el campo "picture" para obtener la imagen de perfil
                const fbResponse = yield axios_1.default.get(`https://graph.facebook.com/me?access_token=${fbToken}&fields=id,name,email,picture.type(large)`);
                const { id: fb_id, name, email, picture } = fbResponse.data;
                const icono = picture.data.url; // URL de la imagen de perfil del usuario
                // Verifica si el usuario ya existe en la base de datos por el fb_id
                const [user] = yield database_1.default.query('SELECT * FROM usuario WHERE fb_id = ?', [fb_id]);
                if (!user) {
                    // Si el usuario no existe, crea uno nuevo con los datos de Facebook, incluyendo el icono
                    const result = yield database_1.default.query('INSERT INTO usuario (usuario, nombres, fb_id, idTipo, icono) VALUES (?, ?, ?, ?, ?)', [email, name, fb_id, 2, icono]);
                    const userId = result.insertId;
                    return res.json({ message: 'Usuario creado con Facebook', userId: userId });
                }
                yield database_1.default.query('UPDATE usuario SET icono = ? WHERE fb_id = ?', [icono, fb_id]);
                // Si el usuario ya existe, simplemente devuelve su ID
                res.json({ message: 'Login exitoso con Facebook', userId: user.idU, icono: user.icono });
            }
            catch (error) {
                console.error('Error al verificar el token de Facebook:', error);
                return res.status(500).json({ message: 'Error en el servidor al verificar el token de Facebook' });
            }
        });
    }
}
exports.authController = new AuthController();

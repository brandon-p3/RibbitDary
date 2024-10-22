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
const database_1 = __importDefault(require("../database")); // Asegúrate de que esta ruta sea correcta
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
}
exports.authController = new AuthController();

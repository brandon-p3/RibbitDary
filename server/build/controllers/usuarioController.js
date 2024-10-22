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
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
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
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { password } = _a, userData = __rest(_a, ["password"]);
                if (!password) {
                    return resp.status(400).json({ message: 'Password is required' });
                }
                // Hashear la contraseña
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                // Guardar el usuario con la contraseña hasheada
                yield database_1.default.query('INSERT INTO usuario SET ?', [Object.assign(Object.assign({}, userData), { password: hashedPassword })]);
                resp.json({ message: 'Usuario guardado' });
            }
            catch (error) {
                console.error('Error al guardar el usuario', error);
                resp.status(500).json({ message: 'Error al guardar el usuario' });
            }
        });
    }
}
exports.usuarioController = new UsuarioController();

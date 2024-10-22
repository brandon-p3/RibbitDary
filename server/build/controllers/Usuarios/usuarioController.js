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
                const _a = req.body, { password, usuario } = _a, userData = __rest(_a, ["password", "usuario"]); // Asegúrate de incluir el email
                if (!password || !usuario) {
                    return resp.status(400).json({ message: 'Password and email are required' });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                const verificationToken = crypto_1.default.randomBytes(32).toString('hex'); // Genera un token
                // Guardar el usuario con la contraseña hasheada y el token
                const result = yield database_1.default.query('INSERT INTO usuario SET ?', [Object.assign(Object.assign({}, userData), { usuario: usuario, password: hashedPassword })]);
                const idU = result.insertId;
                resp.json({ message: 'Usuario guardado, verifica tu correo para activar tu cuenta', idU: idU });
            }
            catch (error) {
                console.error('Error al guardar el usuario', error);
                resp.status(500).json({ message: 'Error al guardar el usuario' });
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

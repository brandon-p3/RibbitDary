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
exports.userxuserController = void 0;
const database_1 = __importDefault(require("../../database"));
class UserxuserController {
    getUserxuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const userxuser = yield database_1.default.query(`SELECT * FROM usuario`);
                    res.json(userxuser);
                }
                else if (user.length > 0 && user[0].idTipo === 3) {
                    const result = yield database_1.default.query('SELECT idU FROM userxuser WHERE idColaborador = ?', [idU]);
                    const id = result[0].idU;
                    const userxuser = yield database_1.default.query(`
                        SELECT usuario.* FROM usuario
                        INNER JOIN userxuser 
                        ON userxuser.idColaborador = usuario.idU
                        WHERE userxuser.idU = ?
                    `, [id]);
                    res.json(userxuser);
                }
                else {
                    const userxuser = yield database_1.default.query(`
                SELECT usuario.* FROM usuario
                INNER JOIN userxuser 
                ON userxuser.idColaborador = usuario.idU
                WHERE userxuser.idU = ?
            `, [idU]);
                    res.json(userxuser);
                }
            }
            catch (error) {
                console.error('Error al obtener usuarios:', error);
                res.status(500).json({ message: 'Error al obtener usuarios' });
            }
        });
    }
    createUserxUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO userxuser SET ?', [req.body]);
                res.json({ message: 'userxuser' });
            }
            catch (error) {
                console.error('Error al crear userxuser', error);
                res.status(500).json({ message: 'Error al crear usuario' });
            }
        });
    }
    deleteUserxUser(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idColaborador } = req.params;
            try {
                yield database_1.default.query('UPDATE tarea SET idColaborador = 0 WHERE idColaborador = ? ', [idColaborador]);
                yield database_1.default.query('DELETE FROM proyectxcolab WHERE idColaborador = ? ', [idColaborador]);
                yield database_1.default.query('DELETE FROM userxuser WHERE idColaborador = ?', [idColaborador]);
                yield database_1.default.query('DELETE FROM usuario WHERE idU = ? ', [idColaborador]);
                resp.json({ message: 'Socio deleted' });
            }
            catch (error) {
                console.error('Error al borrar socio', error);
                resp.status(500).json({ message: 'Error al crear usuario' });
            }
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
}
exports.userxuserController = new UserxuserController();

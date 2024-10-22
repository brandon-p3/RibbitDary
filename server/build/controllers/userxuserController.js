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
const database_1 = __importDefault(require("../database"));
class UserxuserController {
    getUserxuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const userxuser = yield database_1.default.query(`
                SELECT usuario.* FROM usuario 
                INNER JOIN userxuser 
                ON userxuser.idColaborador = usuario.idU
                WHERE userxuser.idU = ?
            `, [idU]);
                // Enviar la respuesta al cliente
                res.json(userxuser);
            }
            catch (error) {
                console.error('Error al obtener usuarios:', error);
                res.status(500).json({ message: 'Error al obtener usuarios' });
            }
        });
    }
}
exports.userxuserController = new UserxuserController();

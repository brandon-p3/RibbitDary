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
exports.configUserController = void 0;
const database_1 = __importDefault(require("../../database"));
class ConfigUserController {
    tipoDeUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                yield database_1.default.query(`SELECT u.nombres, p.namePaquete FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU]);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
}
exports.configUserController = new ConfigUserController();

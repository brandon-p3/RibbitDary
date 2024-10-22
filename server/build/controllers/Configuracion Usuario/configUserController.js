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
                const usuario = yield database_1.default.query(`SELECT * FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU]);
                res.json(usuario);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
    paquetesUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                const usuario = yield database_1.default.query(`SELECT p.cantidadProy, 
                (SELECT COUNT(*) FROM proyecto WHERE idU = ?) as proyectos, p.numPersonas, 
                (SELECT COUNT(*) FROM userxuser WHERE idU = ?) as socios
                FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU, idU, idU, idU]);
                res.json(usuario);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
    tareasUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                const idP = req.params.idP;
                const usuario = yield database_1.default.query(`SELECT p.cantidadTareas,
                (SELECT COUNT(*) FROM tarea WHERE idU = ? AND idP = ?) as tareas
                FROM usuario u 
                INNER JOIN detallespago dp ON u.idU = dp.idU 
                INNER JOIN paquete p ON dp.idPaquete = p.idPaquete 
                WHERE dp.estatus = 'Activo' AND u.idu = ?; `, [idU, idP, idU]);
                res.json(usuario);
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
}
exports.configUserController = new ConfigUserController();

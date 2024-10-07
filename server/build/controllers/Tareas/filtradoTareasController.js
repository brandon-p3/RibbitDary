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
exports.filtradoTareasController = void 0;
const database_1 = __importDefault(require("../../database"));
class FiltradoTareasController {
    // Filtrado de tareas por estatus
    tareasUrgentes(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 10
                AND DATEDIFF(fechaF, CURDATE()) >= 0
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
                    resp.json(proyect);
                }
                else {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE (idU = ? OR idColaborador = ?)
                AND DATEDIFF(fechaF, CURDATE()) < 10
                AND DATEDIFF(fechaF, CURDATE()) >= 0
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
                    resp.json(proyect);
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al obtener las tareas urgentes' });
            }
        });
    }
    tareasMedias(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) < 20
                AND DATEDIFF(fechaF, CURDATE()) >= 10
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
                    resp.json(proyect);
                }
                else {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE (idU = ? OR idColaborador = ?)
                AND DATEDIFF(fechaF, CURDATE()) < 20
                AND DATEDIFF(fechaF, CURDATE()) >= 10
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
                    resp.json(proyect);
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al obtener las tareas medias' });
            }
        });
    }
    tareasNoUrgentes(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE DATEDIFF(fechaF, CURDATE()) >= 20
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
                    resp.json(proyect);
                }
                else {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE (idU = ? OR idColaborador = ?)
                AND DATEDIFF(fechaF, CURDATE()) >= 20
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
                    resp.json(proyect);
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al obtener las tareas no urgentes' });
            }
        });
    }
    tareasVencidas(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE fechaF < CURDATE()
                AND estatus != "Terminada"
                ORDER BY fechaF
            `);
                    resp.json(proyect);
                }
                else {
                    const proyect = yield database_1.default.query(`
                SELECT * FROM tarea
                WHERE (idU = ? OR idColaborador = ?)
                AND fechaF < CURDATE()
                AND estatus != "Terminada"
                ORDER BY fechaF
            `, [idU, idU]);
                    resp.json(proyect);
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error al obtener las tareas vencidas' });
            }
        });
    }
}
exports.filtradoTareasController = new FiltradoTareasController();

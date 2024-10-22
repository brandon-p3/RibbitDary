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
exports.filtradoProyectosController = void 0;
const database_1 = __importDefault(require("../../database"));
class FiltradoProyectosController {
    //Filtrado de tareas estatus
    proyectosActivos(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const [checar] = yield database_1.default.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyectos = yield database_1.default.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Activo"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                }
                else {
                    if (checar) { // Verificar si hay resultados
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Activo"
                    ORDER BY fechaI
                    `, [idU]);
                        resp.json(proyectos);
                    }
                    else {
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Activo"
                    ORDER BY fechaI`, [idU]);
                        resp.json(proyectos);
                    }
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving projects' });
            }
        });
    }
    proyectosBajaTemporal(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const [checar] = yield database_1.default.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyectos = yield database_1.default.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Baja Temporal"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                }
                else {
                    if (checar) { // Verificar si hay resultados
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Baja Temporal"
                    ORDER BY fechaI
                    `, [idU]);
                        resp.json(proyectos);
                    }
                    else {
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Baja Temporal"
                    ORDER BY fechaI`, [idU]);
                        resp.json(proyectos);
                    }
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving projects' });
            }
        });
    }
    proyectosCancelados(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU } = req.params;
            try {
                const [checar] = yield database_1.default.query('SELECT * FROM userxuser WHERE idColaborador = ?', [idU]);
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const proyectos = yield database_1.default.query(`
                    SELECT * 
                    FROM proyecto 
                    WHERE estatus = "Cancelado"
                    ORDER BY fechaI
                    `, [idU]);
                    resp.json(proyectos);
                }
                else {
                    if (checar) { // Verificar si hay resultados
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    INNER JOIN proyectxcolab 
                    ON proyecto.idP = proyectxcolab.idP 
                    WHERE proyectxcolab.idColaborador = ?
                    AND estatus = "Cancelado"
                    ORDER BY fechaI
                    `, [idU]);
                        resp.json(proyectos);
                    }
                    else {
                        const proyectos = yield database_1.default.query(`
                    SELECT proyecto.* 
                    FROM proyecto 
                    WHERE proyecto.idU = ?
                    AND estatus = "Cancelado"
                    ORDER BY fechaI`, [idU]);
                        resp.json(proyectos);
                    }
                }
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving projects' });
            }
        });
    }
}
exports.filtradoProyectosController = new FiltradoProyectosController();

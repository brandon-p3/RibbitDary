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
exports.proyectxcolabController = void 0;
const database_1 = __importDefault(require("../../database"));
class ProyectxcolabController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const proyectxcolab = yield database_1.default.query('SELECT * FROM proyectxcolab');
            resp.json(proyectxcolab);
        });
    }
    listUP(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idP } = req.params;
            try {
                const proyectos = yield database_1.default.query(`
                SELECT usuario.* 
                FROM proyectxcolab INNER JOIN usuario
                ON proyectxcolab.idColaborador = usuario.idU
                WHERE proyectxcolab.idP = ?
                `, [idP]);
                resp.json(proyectos);
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving projects' });
            }
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idU, idP } = req.params;
            try {
                const query = `
                SELECT proyecto.*
                FROM proyecto
                LEFT JOIN proyectxcolab ON proyecto.idP = proyectxcolab.idP
                WHERE (proyecto.idP = ? AND proyecto.idU = ?) OR (proyecto.idP = ? AND proyectxcolab.idColaboradores = ?)
            `;
                const result = yield database_1.default.query(query, [idP, idU, idP, idU]);
                if (result.length > 0) {
                    resp.json(result[0]);
                }
                else {
                    resp.status(404).json({ message: 'Proyecto no encontrado' });
                }
            }
            catch (error) {
                console.error('Error al obtener proyecto:', error);
                resp.status(500).json({ message: 'Error interno del servidor' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO proyectxcolab SET ?', [req.body]);
            resp.json({ message: 'Proyect Saved' });
        });
    }
    /*
        public async update(req : Request, resp : Response){
            const {idP} = req.params;
            await pool.query('UPDATE proyectxcolab SET ? WHERE idP =?', [req.body, idP]);
            resp.json({message:'Updating a proyectxcolab ' + req.params.id});
        }*/
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idP, idColaborador } = req.params;
            try {
                const tareas = yield database_1.default.query('SELECT idT FROM tarea WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);
                if (tareas.length > 0) {
                    const idsTareas = tareas.map((tarea) => tarea.idT);
                    yield database_1.default.query('DELETE FROM material WHERE idT IN (?)', [idsTareas]);
                }
                yield database_1.default.query('DELETE FROM tarea WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);
                yield database_1.default.query('DELETE FROM proyectxcolab WHERE idP = ? AND idColaborador = ?', [idP, idColaborador]);
                resp.json({ message: 'proyectxcolab deleted and related materials removed' });
            }
            catch (error) {
                console.error('Error al borrar proyectxcolab y materiales:', error);
                resp.status(500).json({ message: 'Error al borrar proyectxcolab y materiales' });
            }
        });
    }
}
exports.proyectxcolabController = new ProyectxcolabController();

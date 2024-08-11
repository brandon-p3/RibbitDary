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
exports.tipoProyectoController = void 0;
const database_1 = __importDefault(require("../../database"));
class TipoProyectoController {
    proyectoTipo(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idType } = req.params;
            const tipoProyecto = yield database_1.default.query('SELECT * FROM tipoproyecto WHERE idType = ?', [idType]);
            resp.json(tipoProyecto);
        });
    }
    getTipoProyecto(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const tipoProyecto = yield database_1.default.query('SELECT * FROM tipoproyecto WHERE idType != 0');
            resp.json(tipoProyecto);
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            yield database_1.default.query('INSERT INTO tipoproyecto SET ?', [req.body]);
            resp.json({ message: 'Tipo de proyecto creado' });
        });
    }
    update(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idType } = req.params;
            yield database_1.default.query('UPDATE tipoproyecto SET ? WHERE idType = ?', [req.body, idType]);
            resp.json({ message: 'Tipo de proyecto actualizado' + req.params.id });
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idType } = req.params;
            // Ejecutar la primera consulta
            yield database_1.default.query(`
            UPDATE proyecto SET idType = 0 WHERE idType = ?;
        `, [idType]);
            // Ejecutar la segunda consulta
            yield database_1.default.query(`
            DELETE FROM tipoproyecto WHERE idType = ?;
        `, [idType]);
            resp.json({ message: 'Tipo de proyecto eliminado ' + idType });
        });
    }
}
exports.tipoProyectoController = new TipoProyectoController();

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
exports.paquetesController = void 0;
const database_1 = __importDefault(require("../../database"));
class PaquetesController {
    listPaquetes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paquetes = yield database_1.default.query('SELECT * FROM paquete');
                res.json(paquetes);
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la petición' });
            }
        });
    }
    obtenerPaquetePorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPaquete } = req.params;
                const paquete = yield database_1.default.query('SELECT * FROM paquete WHERE idPaquete = ?', [idPaquete]);
                if (paquete.length > 0) {
                    res.json(paquete[0]);
                }
                else {
                    res.status(404).json({ message: 'Paquete no encontrado' });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error al obtener el paquete' });
            }
        });
    }
    crearPaquetes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paquete = req.body;
                const createP = yield database_1.default.query('INSERT INTO paquete SET ?', [paquete]);
                res.json({ message: 'Paquete creado', createP });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la creación' });
            }
        });
    }
    eliminarPaquete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPaquete } = req.params;
                const deleteP = yield database_1.default.query('DELETE FROM paquete WHERE idPaquete = ?', [idPaquete]);
                res.json({ message: 'Paquete eliminado', deleteP });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la eliminación' });
            }
        });
    }
    actualizarPaquete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idPaquete } = req.params;
                const paquete = req.body;
                const updateP = yield database_1.default.query('UPDATE paquete SET ? WHERE idPaquete = ?', [paquete, idPaquete]);
                res.json({ message: 'Paquete actualizado', updateP });
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: 'Error en la actualización' });
            }
        });
    }
}
exports.paquetesController = new PaquetesController();

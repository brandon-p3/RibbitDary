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
exports.tajertaController = void 0;
const database_1 = __importDefault(require("../../database"));
class TajertaController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const idU = req.params.idU;
            try {
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const tarjeta = yield database_1.default.query('SELECT * FROM tarjeta');
                    resp.json(tarjeta);
                }
                else {
                    const tarjeta = yield database_1.default.query('SELECT * FROM tarjeta WHERE idU = ?', [idU]);
                    resp.json(tarjeta);
                }
            }
            catch (error) {
                console.log(error);
                resp.status(500).send('Error al obtener la tajerta');
                return;
            }
        });
    }
    getOne(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { numTarjeta } = req.params;
            try {
                const tarjeta = yield database_1.default.query('SELECT * FROM tarjeta WHERE numTarjeta = ?', [numTarjeta]);
                if (tarjeta.length > 0) {
                    resp.json(tarjeta[0]);
                }
                else {
                    resp.status(404).json({ message: 'tarjeta no encontrada U', numTarjeta });
                }
            }
            catch (error) {
                console.log(error);
                resp.status(500).send('Error al obtener la tarjeta');
            }
        });
    }
    createTarjeta(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const tarjeta = yield database_1.default.query('INSERT INTO tarjeta SET ?', [req.body]);
                const numTarjeta = tarjeta.insertId;
                resp.json({ message: 'tarjeta guardada', numTarjeta: numTarjeta });
            }
            catch (error) {
                console.log(error);
                resp.status(500).send('Error al guardar la tarjeta');
                return;
            }
        });
    }
    updateTarjeta(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numTarjeta } = req.params;
                yield database_1.default.query('UPDATE tarjeta SET ? WHERE numTarjeta = ?', [req.body, numTarjeta]);
                resp.json({ message: 'tarjeta actualizada' });
            }
            catch (error) {
                console.log(error);
                resp.status(500).send('Error al actualizar la tarjeta');
                return;
            }
        });
    }
    deleteTarjeta(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { numTarjeta } = req.params;
                yield database_1.default.query('DELETE FROM tarjeta WHERE numTarjeta = ?', [numTarjeta]);
                resp.json({ message: 'tarjeta eliminada' });
            }
            catch (error) {
                console.log(error);
                resp.status(500).send('Error al eliminar la tarjeta');
                return;
            }
        });
    }
}
exports.tajertaController = new TajertaController();

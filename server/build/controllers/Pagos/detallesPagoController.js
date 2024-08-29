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
exports.detallesPagoController = void 0;
const database_1 = __importDefault(require("../../database"));
class DetallesPagoController {
    listDP(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const idU = req.params.idU;
                const user = yield database_1.default.query('SELECT idTipo FROM usuario WHERE idU = ?', [idU]);
                if (user.length > 0 && user[0].idTipo === 1) {
                    const detalleP = yield database_1.default.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta`);
                    res.json(detalleP);
                }
                else {
                    const detalleP = yield database_1.default.query(`
                    SELECT * FROM detallespago INNER JOIN usuario ON detallespago.idU = usuario.idU
                    INNER JOIN paquete ON detallespago.idPaquete = paquete.idPaquete
                    INNER JOIN tarjeta ON detallespago.numTarjeta = tarjeta.numTarjeta
                    WHERE detallespago.idU = ?`, [idU]);
                    res.json(detalleP);
                }
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error en el servidor');
            }
        });
    }
    createDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO detallespago SET?', [req.body]);
                res.json({ message: 'Detalle de pago creado' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error al insertar el detalle');
            }
        });
    }
    deleteDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idDetallePago } = req.params;
                yield database_1.default.query('DELETE FROM detallespago WHERE idDetallePago =?', [idDetallePago]);
                res.json({ message: 'Detalle de pago eliminado' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error al eliminar el detalle');
            }
        });
    }
    updateDetalle(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { idDetallePago } = req.params;
                yield database_1.default.query('UPDATE detallespago SET ? WHERE idDetallePago = ?', [req.body, idDetallePago]);
                res.json({ message: 'Detalle de pago actualizado' });
            }
            catch (error) {
                console.log(error);
                res.status(500).send('Error al actualizar el detalle');
            }
        });
    }
}
exports.detallesPagoController = new DetallesPagoController();

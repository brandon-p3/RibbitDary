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
exports.matriealesController = void 0;
const database_1 = __importDefault(require("../database"));
class MatriealesController {
    list(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const material = yield database_1.default.query('SELECT * FROM material');
            resp.json(material);
        });
    }
    getList(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idT } = req.params;
            try {
                const material = yield database_1.default.query(`
                SELECT material.* 
                FROM material 
                WHERE material.idT = ?
                `, [idT]);
                resp.json(material);
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error retrieving material' });
            }
        });
    }
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield database_1.default.query('INSERT INTO material SET ?', [req.body]);
                resp.json({ message: 'Material saved' });
            }
            catch (error) {
                console.error(error);
                resp.status(500).json({ message: 'Error creating material' });
            }
        });
    }
    delete(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idMt } = req.params;
            try {
                yield database_1.default.query('DELETE FROM material WHERE idMt = ?', [idMt]);
                resp.json({ message: 'Material deleted' });
            }
            catch (err) {
                {
                    console.error(err);
                    resp.status(500).json({ message: 'Error deleting material' });
                }
            }
        });
    }
}
exports.matriealesController = new MatriealesController();

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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearUsuarioController = void 0;
const database_1 = __importDefault(require("../database"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class CrearUsuarioController {
    create(req, resp) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _a = req.body, { password } = _a, userData = __rest(_a, ["password"]);
                if (!password) {
                    return resp.status(400).json({ messege: 'password is required' });
                }
                const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
                yield database_1.default.query('INSERT INTO usuario SET ?', [Object.assign(Object.assign({}, userData), { password: hashedPassword })]);
                resp.json({ messege: 'usuario agregado' });
            }
            catch (error) {
                console.error('error al gaurdar el usuario', error);
                resp.status(500).json({ messege: 'error al guardar el usuario ' });
            }
        });
    }
}
exports.crearUsuarioController = new CrearUsuarioController();

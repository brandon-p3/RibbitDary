"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/Usuarios/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.usuarioController.list);
        this.router.get('/:idU', usuarioController_1.usuarioController.getOne);
        this.router.post('/', usuarioController_1.usuarioController.create);
    }
}
const usuarioRoutes = new UsuarioRoutes;
exports.default = usuarioRoutes.router;

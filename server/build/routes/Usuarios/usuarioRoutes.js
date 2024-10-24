"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../../controllers/Usuarios/usuarioController");
class UsuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', usuarioController_1.usuarioController.list);
        this.router.get('/:idU', usuarioController_1.usuarioController.getOne);
        this.router.get('/edit/:idU', usuarioController_1.usuarioController.getOneEdit);
        this.router.post('/', usuarioController_1.usuarioController.create);
        this.router.put('/:idU', usuarioController_1.usuarioController.update);
        this.router.delete('/:idU', usuarioController_1.usuarioController.delete);
        this.router.put('/password/edit/:idU', usuarioController_1.usuarioController.updatePassword);
        this.router.put('/ubi/edit/:idU', usuarioController_1.usuarioController.ubicacion);
        this.router.put('/userIdTwitch/edit/:idU', usuarioController_1.usuarioController.updateTwitch);
        this.router.get('/userIdTwitch/:idU', usuarioController_1.usuarioController.getUserStream);
    }
}
const usuarioRoutes = new UsuarioRoutes;
exports.default = usuarioRoutes.router;

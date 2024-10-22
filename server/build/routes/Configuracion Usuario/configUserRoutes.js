"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const configUserController_1 = require("../../controllers/Configuracion Usuario/configUserController");
class ConfigUserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idU', configUserController_1.configUserController.tipoDeUsuario);
        this.router.get('/paquetesU/:idU', configUserController_1.configUserController.paquetesUsuario);
        this.router.get('/tareasU/:idU/:idP', configUserController_1.configUserController.tareasUsuario);
    }
}
const configUserRoutes = new ConfigUserRoutes;
exports.default = configUserRoutes.router;

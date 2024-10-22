"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoProyectController_1 = require("../controllers/Proyectos/tipoProyectController");
class TipoProyectoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idType', tipoProyectController_1.tipoProyectoController.proyectoTipo);
    }
}
const tipoProyectoRoutes = new TipoProyectoRoutes;
exports.default = tipoProyectoRoutes.router;

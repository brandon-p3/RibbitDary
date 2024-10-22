"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tipoProyectController_1 = require("../../controllers/TipoProyecto/tipoProyectController");
class TipoProyectoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idType', tipoProyectController_1.tipoProyectoController.proyectoTipo);
        this.router.get('/', tipoProyectController_1.tipoProyectoController.getTipoProyecto);
        this.router.post('/', tipoProyectController_1.tipoProyectoController.create);
        this.router.put('/:idType', tipoProyectController_1.tipoProyectoController.update);
        this.router.delete('/:idType', tipoProyectController_1.tipoProyectoController.delete);
    }
}
const tipoProyectoRoutes = new TipoProyectoRoutes;
exports.default = tipoProyectoRoutes.router;

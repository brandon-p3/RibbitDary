"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const progresoController_1 = require("../../controllers/Proyectos/progresoController");
class ProgresoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Obtener Progreso
        this.router.get('/:idP', progresoController_1.progresoController.getProgreso);
    }
}
const progresoRoutes = new ProgresoRoutes;
exports.default = progresoRoutes.router;

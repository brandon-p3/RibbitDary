"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtradoProyectsController_1 = require("../../controllers/Proyectos/filtradoProyectsController");
class FiltradoProyectoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Para ver las tareas por su urgencia
        this.router.get('/activos/:idU', filtradoProyectsController_1.filtradoProyectosController.proyectosActivos);
        this.router.get('/bajaTemporal/:idU', filtradoProyectsController_1.filtradoProyectosController.proyectosBajaTemporal);
        this.router.get('/cancelados/:idU', filtradoProyectsController_1.filtradoProyectosController.proyectosCancelados);
    }
}
const filtradoProyectoRoutes = new FiltradoProyectoRoutes;
exports.default = filtradoProyectoRoutes.router;

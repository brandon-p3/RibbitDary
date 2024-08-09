"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const filtradoTareasController_1 = require("../../controllers/Tareas/filtradoTareasController");
class FiltradoTareasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Para ver las tareas por su urgencia
        this.router.get('/tareasUrgentes/:idU', filtradoTareasController_1.filtradoTareasController.tareasUrgentes);
        this.router.get('/tareasMedias/:idU', filtradoTareasController_1.filtradoTareasController.tareasMedias);
        this.router.get('/tareasNoUrgentes/:idU', filtradoTareasController_1.filtradoTareasController.tareasNoUrgentes);
        this.router.get('/tareasVencidas/:idU', filtradoTareasController_1.filtradoTareasController.tareasVencidas);
    }
}
const filtradoTareasRoutes = new FiltradoTareasRoutes;
exports.default = filtradoTareasRoutes.router;

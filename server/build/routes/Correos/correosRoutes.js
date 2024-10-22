"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const correosController_1 = require("../../controllers/Correos/correosController");
class CorreosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //Para ver las tareas por su urgencia
        this.router.post('/prueba-correo', correosController_1.correoController.enviarCorreo);
        this.router.get('/correo-tareasU/:idU', correosController_1.correoController.tareasUrgentes);
    }
}
const correosRoutes = new CorreosRoutes;
exports.default = correosRoutes.router;

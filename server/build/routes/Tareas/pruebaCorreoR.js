"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pruebaCorreoC_1 = require("../../controllers/Tareas/pruebaCorreoC");
class CorreoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.post('/prueba-correo', pruebaCorreoC_1.correoController.pruebaEnvioCorreo);
    }
}
const correoRoutes = new CorreoRoutes;
exports.default = correoRoutes.router;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paquetesController_1 = require("../../controllers/Pagos/paquetesController");
class PaquetesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', paquetesController_1.paquetesController.listPaquetes);
        this.router.post('/', paquetesController_1.paquetesController.crearPaquetes);
        this.router.put('/:idPaquete', paquetesController_1.paquetesController.actualizarPaquete);
        this.router.delete('/:idPaquete', paquetesController_1.paquetesController.eliminarPaquete);
        this.router.get('/edit/:idPaquete', paquetesController_1.paquetesController.obtenerPaquetePorId);
    }
}
const paquetesRoutes = new PaquetesRoutes;
exports.default = paquetesRoutes.router;

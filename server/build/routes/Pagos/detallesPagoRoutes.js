"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const detallesPagoController_1 = require("../../controllers/Pagos/detallesPagoController");
class DetallesPagoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idU', detallesPagoController_1.detallesPagoController.listDP);
        this.router.post('/:idU', detallesPagoController_1.detallesPagoController.createDetalle);
        this.router.put('/:idDetallePago', detallesPagoController_1.detallesPagoController.updateDetalle);
        this.router.delete('/:idDetallePago', detallesPagoController_1.detallesPagoController.deleteDetalle);
    }
}
const detallesPagoRoutes = new DetallesPagoRoutes;
exports.default = detallesPagoRoutes.router;

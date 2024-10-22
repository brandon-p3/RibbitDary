"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tarjetaController_1 = require("../../controllers/Pagos/tarjetaController");
class TajertaRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idU', tarjetaController_1.tajertaController.list);
        this.router.post('/', tarjetaController_1.tajertaController.createTarjeta);
        this.router.put('/:numTarjeta', tarjetaController_1.tajertaController.updateTarjeta);
        this.router.delete('/:numTarjeta', tarjetaController_1.tajertaController.deleteTarjeta);
        this.router.get('/edit/:numTarjeta', tarjetaController_1.tajertaController.getOne);
    }
}
const tajertaRoutes = new TajertaRoutes;
exports.default = tajertaRoutes.router;

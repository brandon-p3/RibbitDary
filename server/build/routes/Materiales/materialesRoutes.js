"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const materialesController_1 = require("../../controllers/Materiales/materialesController");
class MaterialesRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', materialesController_1.matriealesController.list);
        this.router.get('/:idT', materialesController_1.matriealesController.getList);
        this.router.post('/', materialesController_1.matriealesController.create);
        this.router.delete('/:idMt', materialesController_1.matriealesController.delete);
    }
}
const materialesRoutes = new MaterialesRoutes;
exports.default = materialesRoutes.router;

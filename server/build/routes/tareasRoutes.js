"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tareasController_1 = require("../controllers/Tareas/tareasController");
class TareasRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idU', tareasController_1.tareasController.list);
        //Creando una ruta para mi aplicación del servidor para la 
        //ruta inicial y se devuelve el mensaje Hello
        this.router.post('/', tareasController_1.tareasController.create);
        this.router.delete('/:idT', tareasController_1.tareasController.delete);
        this.router.put('/:idT', tareasController_1.tareasController.update);
        this.router.get('/:idU/:idP/:idT', tareasController_1.tareasController.getOne);
        this.router.get('/:idU/:idP', tareasController_1.tareasController.listP);
        //Para actualizar el estatus de la tarea
        this.router.put('/estatusTarea/:idT', tareasController_1.tareasController.estusTarea);
    }
}
const tareasRoutes = new TareasRoutes;
exports.default = tareasRoutes.router;

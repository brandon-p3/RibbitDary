"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyectsController_1 = require("../controllers/Proyectos/proyectsController");
class ProyectsRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proyectsController_1.proyectsController.list);
        this.router.get('/:idU', proyectsController_1.proyectsController.listU);
        //Creando una ruta para mi aplicación del servidor para la 
        //ruta inicial y se devuelve el mensaje Hello
        this.router.post('/', proyectsController_1.proyectsController.create);
        this.router.delete('/:idP', proyectsController_1.proyectsController.delete);
        this.router.put('/:idP', proyectsController_1.proyectsController.update);
        this.router.get('/:idU/:idP', proyectsController_1.proyectsController.getOne);
        // En tu archivo de enrutador (por ejemplo, `proyects.routes.ts`)
        this.router.get('/busqueda/:idU/:b', proyectsController_1.proyectsController.buscarProyecto);
        //Para actualizar el estatus de la tarea
        this.router.put('/estatusProyecto/:idP', proyectsController_1.proyectsController.estusProyecto);
    }
}
const proyectsRoutes = new ProyectsRoutes;
exports.default = proyectsRoutes.router;

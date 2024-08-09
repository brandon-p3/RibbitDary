"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const proyectxcolabController_1 = require("../controllers/Proyectos/proyectxcolabController");
class ProyectxcolabRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/', proyectxcolabController_1.proyectxcolabController.list);
        this.router.get('/:idP', proyectxcolabController_1.proyectxcolabController.listUP);
        //Creando una ruta para mi aplicación del servidor para la 
        //ruta inicial y se devuelve el mensaje Hello
        this.router.get('/:idU/:idP', proyectxcolabController_1.proyectxcolabController.getOne);
        this.router.post('/', proyectxcolabController_1.proyectxcolabController.create);
        // this.router.put('/:idPC', proyectxcolabController.update);
        this.router.delete('/:idP/:idColaborador', proyectxcolabController_1.proyectxcolabController.delete);
    }
}
const proyectxcolabRoutes = new ProyectxcolabRoutes;
exports.default = proyectxcolabRoutes.router;

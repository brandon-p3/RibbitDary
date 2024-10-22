"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userxuserController_1 = require("../../controllers/Usuarios/userxuserController");
class UserxuserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/:idU', userxuserController_1.userxuserController.getUserxuser);
        this.router.post('/', userxuserController_1.userxuserController.createUserxUser);
        this.router.delete('/:idColaborador', userxuserController_1.userxuserController.deleteUserxUser);
        this.router.get('/:idU', userxuserController_1.userxuserController.getOne);
    }
}
const userxuserRoutes = new UserxuserRoutes();
exports.default = userxuserRoutes.router;

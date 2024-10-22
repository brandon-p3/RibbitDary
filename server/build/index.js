"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const proyectsRoutes_1 = __importDefault(require("./routes/Proyectos/proyectsRoutes"));
const tareasRoutes_1 = __importDefault(require("./routes/Tareas/tareasRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const proyectxcolabRoutes_1 = __importDefault(require("./routes/Proyectos/proyectxcolabRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/Usuarios/usuarioRoutes"));
const userxuserRoutes_1 = __importDefault(require("./routes/Usuarios/userxuserRoutes"));
const materialesRoutes_1 = __importDefault(require("./routes/Materiales/materialesRoutes"));
const authRoutes_1 = __importDefault(require("./routes/Usuarios/authRoutes"));
const tipoProyectRoutes_1 = __importDefault(require("./routes/TipoProyecto/tipoProyectRoutes"));
const progresoRoutes_1 = __importDefault(require("./routes/Proyectos/progresoRoutes"));
const filtradoTareasRoutes_1 = __importDefault(require("./routes/Tareas/filtradoTareasRoutes"));
const filtradoProyectosRoutes_1 = __importDefault(require("./routes/Proyectos/filtradoProyectosRoutes"));
const paquetesRoutes_1 = __importDefault(require("./routes/Pagos/paquetesRoutes"));
const detallesPagoRoutes_1 = __importDefault(require("./routes/Pagos/detallesPagoRoutes"));
const tarjetaRoutes_1 = __importDefault(require("./routes/Pagos/tarjetaRoutes"));
const correosRoutes_1 = __importDefault(require("./routes/Correos/correosRoutes"));
const configUserRoutes_1 = __importDefault(require("./routes/Configuracion Usuario/configUserRoutes"));
class Server {
    constructor() {
        this.app = (0, express_1.default)();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/api/proyects', proyectsRoutes_1.default);
        this.app.use('/api/tareas', tareasRoutes_1.default);
        this.app.use('/api/proyectxcolab', proyectxcolabRoutes_1.default);
        this.app.use('/api/userxuser', userxuserRoutes_1.default);
        this.app.use('/api/usuario', usuarioRoutes_1.default);
        this.app.use('/api/materiales', materialesRoutes_1.default);
        this.app.use('/api/tipoproyecto', tipoProyectRoutes_1.default);
        this.app.use('/api', authRoutes_1.default);
        this.app.use('/api/progreso', progresoRoutes_1.default);
        this.app.use('/api/filtrado', filtradoTareasRoutes_1.default);
        this.app.use('/api/filtradoP', filtradoProyectosRoutes_1.default);
        this.app.use('/api/paquete', paquetesRoutes_1.default);
        this.app.use('/api/tarjeta', tarjetaRoutes_1.default);
        this.app.use('/api/detallespago', detallesPagoRoutes_1.default);
        this.app.use('/api/correo', correosRoutes_1.default);
        this.app.use('/api/configUser', configUserRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();

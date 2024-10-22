import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import proyectsRoutes from './routes/Proyectos/proyectsRoutes';
import tareasRoutes from './routes/Tareas/tareasRoutes';
import morgan from 'morgan';
import cors from 'cors';
import proyectxcolabRoutes from './routes/Proyectos/proyectxcolabRoutes';
import usuarioRoutes from './routes/Usuarios/usuarioRoutes';
import userxuserRoutes from './routes/Usuarios/userxuserRoutes';
import materialesRoutes from './routes/Materiales/materialesRoutes';
import authRoutes from './routes/Usuarios/authRoutes';
import tipoProyectoRoutes from './routes/TipoProyecto/tipoProyectRoutes';
import progresoRoutes from './routes/Proyectos/progresoRoutes';
import filtradoTareasRoutes from './routes/Tareas/filtradoTareasRoutes';
import filtradoProyectosRoutes from './routes/Proyectos/filtradoProyectosRoutes';
import paquetesRoutes from './routes/Pagos/paquetesRoutes';
import detallesPagoRoutes from './routes/Pagos/detallesPagoRoutes';
import tarjetaRoutes from './routes/Pagos/tarjetaRoutes';
import correosRoutes from './routes/Correos/correosRoutes';
import configUserRoutes from './routes/Configuracion Usuario/configUserRoutes';

class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 5000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: false }));
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/proyects', proyectsRoutes);
        this.app.use('/api/tareas', tareasRoutes);
        this.app.use('/api/proyectxcolab', proyectxcolabRoutes);
        this.app.use('/api/userxuser', userxuserRoutes);
        this.app.use('/api/usuario', usuarioRoutes);
        this.app.use('/api/materiales', materialesRoutes);
        this.app.use('/api/tipoproyecto', tipoProyectoRoutes);
        this.app.use('/api', authRoutes); 
        this.app.use('/api/progreso', progresoRoutes);
        this.app.use('/api/filtrado', filtradoTareasRoutes)
        this.app.use('/api/filtradoP', filtradoProyectosRoutes);
        this.app.use('/api/paquete', paquetesRoutes);
        this.app.use('/api/tarjeta', tarjetaRoutes);
        this.app.use('/api/detallespago', detallesPagoRoutes);
        this.app.use('/api/correo', correosRoutes);
        this.app.use('/api/configUser', configUserRoutes);

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();

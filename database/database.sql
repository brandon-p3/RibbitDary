-- Crear la base de datos RibbitDary
CREATE DATABASE ribbitdary;
GO

-- Usar la base de datos RibbitDary
USE ribbitdary;


-- Crear tabla TipoUsuario
CREATE TABLE tipousuario (
    idTipo TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(15) NOT NULL
);


-- Crear tabla Usuario
CREATE TABLE usuario (
    idU INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    aPuP VARCHAR(20) NOT NULL,
    aPuM VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    nombres VARCHAR(30),
    idTipo TINYINT NOT NULL,
    icono VARCHAR(255),
    lat DOUBLE,
    lng DOUBLE,
    fb_id VARCHAR(255),
    CONSTRAINT idTipo_FK FOREIGN KEY (idTipo) REFERENCES tipousuario(idTipo),
    CONSTRAINT unique_usuario UNIQUE (usuario),
    email_verified BOOLEAN,
    verification_token VARCHAR(255),
);

-- Crear tabla UserXUser
CREATE TABLE userxuser (
    idU INT NOT NULL,
    idColaborador INT NOT NULL,
    PRIMARY KEY (idU, idColaborador),
    CONSTRAINT idU_FK FOREIGN KEY (idU) REFERENCES usuario(idU),
    CONSTRAINT idColaborador_FK FOREIGN KEY (idColaborador) REFERENCES usuario(idU)
);

-- Crear tabla Tarjeta
CREATE TABLE tarjeta (
    numTarjeta VARCHAR(255) NOT NULL PRIMARY KEY,
    cvv INT NOT NULL,
    numTelefono INT NOT NULL,
    tipoTarjeta VARCHAR(15) NOT NULL,
    direccion VARCHAR(100),
    titular VARCHAR(255),
    expira_year INT NOT NULL CHECK (expira_year >= 1900 AND expira_year <= 2100),
    expira_month TINYINT NOT NULL CHECK (expira_month >= 1 AND expira_month <= 12),
    idU INT NOT NULL,
    CONSTRAINT idU_Tarjeta_FK FOREIGN KEY (idU) REFERENCES usuario(idU)
);

-- Crear tabla Paquete
CREATE TABLE paquete (
    idPaquete INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tiempo VARCHAR(10) NOT NULL,
    cantidadProy INT NOT NULL,
    cantidadTareas INT NOT NULL,
    numPersonas INT NOT NULL,
    namePaquete VARCHAR(20) NOT NULL,
    capacidad INT NOT NULL,
    precio INT NOT NULL
);

-- Crear tabla DetallesPago
CREATE TABLE detallespago (
    idDetallePago INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    idU INT NOT NULL,
    idPaquete INT NOT NULL,
    fechaI DATE NOT NULL, 
    fechaF DATE NOT NULL, 
    create_time DATETIME, -- Fecha y hora de creación del pago
    email_address VARCHAR(255), -- Email del pagador
    payer_id VARCHAR(255), -- ID del pagador
    status VARCHAR(50), -- Estado del pago (e.g., COMPLETED, PENDING)
    orderID VARCHAR(255), -- ID de la orden en PayPal
    paymentSource VARCHAR(50), -- Fuente del pago (e.g., PayPal, card)
    amount DECIMAL(10, 2) NOT NULL, -- Monto pagado
    currency VARCHAR(10) DEFAULT 'MXN', -- Moneda usada en el pago
    estatus VARCHAR(30),
    CONSTRAINT idU_DP_FK FOREIGN KEY (idU) REFERENCES usuario(idU),
    CONSTRAINT idPaquete_DP_FK FOREIGN KEY (idPaquete) REFERENCES paquete(idPaquete)
);


-- Crear tabla TipoProyecto
CREATE TABLE tipoproyecto (
    idType INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoProyecto VARCHAR(20) NOT NULL
);

-- Crear tabla Proyecto
CREATE TABLE proyecto (
    idP INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nameProyect VARCHAR(30) NOT NULL,
    descripcion VARCHAR(255) NOT NULL,
    fechaI DATE NOT NULL,
    fechaF DATE NOT NULL,
    notas VARCHAR(255),
    idU INT NOT NULL,
    idType INT NOT NULL,
    estatus VARCHAR(50),
    presupuesto INT,
    CONSTRAINT idU_Pro_FK FOREIGN KEY (idU) REFERENCES usuario(idU),
    CONSTRAINT idType_FK FOREIGN KEY (idType) REFERENCES tipoproyecto(idType)
);

-- Crear tabla ProyectXColab
CREATE TABLE proyectxcolab (
    idColaborador INT NOT NULL,
    idP INT NOT NULL,
    PRIMARY KEY (idColaborador, idP),
    CONSTRAINT idColab_Pro_FK FOREIGN KEY (idColaborador) REFERENCES usuario(idU),
    CONSTRAINT idP_Pro_FK FOREIGN KEY (idP) REFERENCES proyecto(idP)
);

-- Crear tabla Tarea
CREATE TABLE tarea (
    idT INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nomTarea VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    fechaI DATE NOT NULL,
    fechaF DATE NOT NULL,
    idU INT NOT NULL,
    idColaborador INT NOT NULL,
    idP INT NOT NULL,
    estatus VARCHAR(60) NOT NULL,
    lat DOUBLE,
    lng DOUBLE,
    CONSTRAINT idU_Tar_FK FOREIGN KEY (idU) REFERENCES usuario(idU),
    CONSTRAINT idColab_Tar_FK FOREIGN KEY (idColaborador) REFERENCES usuario(idU),
    CONSTRAINT idP_Tar_FK FOREIGN KEY (idP) REFERENCES proyecto(idP)
);

-- Crear tabla Material
CREATE TABLE material (
    idMt INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreMaterial VARCHAR(50) NOT NULL,
    idT INT NOT NULL,
    idP INT NOT NULL,
    CONSTRAINT idT_FK FOREIGN KEY (idT) REFERENCES tarea(idT),
    CONSTRAINT idP_Mat_FK FOREIGN KEY (idP) REFERENCES proyecto(idP)
);


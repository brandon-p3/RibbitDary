-- Crear la base de datos RibbitDary
CREATE DATABASE RibbitDary;
GO

-- Usar la base de datos RibbitDary
USE RibbitDary;
GO

-- Crear tabla TipoUsuario
CREATE TABLE TipoUsuario (
    idTipo TINYINT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    nombre VARCHAR(15) NOT NULL
);

-- Crear tabla Usuario
CREATE TABLE Usuario (
    idU INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(20) NOT NULL,
    aPuP VARCHAR(20) NOT NULL,
    aPuM VARCHAR(20),
    password VARCHAR(255) NOT NULL,
    nombres VARCHAR(30),
    idTipo TINYINT NOT NULL,
    icono VARCHAR(255),
    CONSTRAINT idTipo_FK FOREIGN KEY (idTipo) REFERENCES TipoUsuario(idTipo),
    CONSTRAINT unique_usuario UNIQUE (usuario)
);

-- Crear tabla UserXUser
CREATE TABLE UserXUser (
    idU INT NOT NULL,
    idColaborador INT NOT NULL,
    PRIMARY KEY (idU, idColaborador),
    CONSTRAINT idU_FK FOREIGN KEY (idU) REFERENCES Usuario(idU),
    CONSTRAINT idColaborador_FK FOREIGN KEY (idColaborador) REFERENCES Usuario(idU)
);

-- Crear tabla Tarjeta
CREATE TABLE Tarjeta (
    numTarjeta INT NOT NULL PRIMARY KEY,
    cvv INT NOT NULL,
    numTelefono INT NOT NULL,
    tipoTarjeta VARCHAR(15) NOT NULL,
    direccion VARCHAR(100),
    expira_year INT NOT NULL CHECK (expira_year >= 1900 AND expira_year <= 2100),
    expira_month TINYINT NOT NULL CHECK (expira_month >= 1 AND expira_month <= 12),
    idU INT NOT NULL,
    CONSTRAINT idU_Tarjeta_FK FOREIGN KEY (idU) REFERENCES Usuario(idU)
);

-- Crear tabla Paquete
CREATE TABLE Paquete (
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
CREATE TABLE DetallesPago (
    idU INT NOT NULL,
    idPaquete INT NOT NULL,
    numTarjeta INT NOT NULL,
    fechaI DATE NOT NULL,
    fechaF DATE NOT NULL,
    PRIMARY KEY (idU, idPaquete, numTarjeta),
    CONSTRAINT idU_DP_FK FOREIGN KEY (idU) REFERENCES Usuario(idU),
    CONSTRAINT idPaquete_DP_FK FOREIGN KEY (idPaquete) REFERENCES Paquete(idPaquete),
    CONSTRAINT numTarjeta_FK FOREIGN KEY (numTarjeta) REFERENCES Tarjeta(numTarjeta)
);

-- Crear tabla TipoProyecto
CREATE TABLE TipoProyecto (
    idType INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    tipoProyecto VARCHAR(20) NOT NULL
);

-- Crear tabla Proyecto
CREATE TABLE Proyecto (
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
    CONSTRAINT idU_Pro_FK FOREIGN KEY (idU) REFERENCES Usuario(idU),
    CONSTRAINT idType_FK FOREIGN KEY (idType) REFERENCES TipoProyecto(idType)
);

-- Crear tabla ProyectXColab
CREATE TABLE ProyectXColab (
    idColaborador INT NOT NULL,
    idP INT NOT NULL,
    PRIMARY KEY (idColaborador, idP),
    CONSTRAINT idColab_Pro_FK FOREIGN KEY (idColaborador) REFERENCES Usuario(idU),
    CONSTRAINT idP_Pro_FK FOREIGN KEY (idP) REFERENCES Proyecto(idP)
);

-- Crear tabla Tarea
CREATE TABLE Tarea (
    idT INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nomTarea VARCHAR(100) NOT NULL,
    descripcion VARCHAR(255),
    fechaI DATE NOT NULL,
    fechaF DATE NOT NULL,
    idU INT NOT NULL,
    idColaborador INT NOT NULL,
    idP INT NOT NULL,
    estatus VARCHAR(60) NOT NULL,
    CONSTRAINT idU_Tar_FK FOREIGN KEY (idU) REFERENCES Usuario(idU),
    CONSTRAINT idColab_Tar_FK FOREIGN KEY (idColaborador) REFERENCES Usuario(idU),
    CONSTRAINT idP_Tar_FK FOREIGN KEY (idP) REFERENCES Proyecto(idP)
);

-- Crear tabla Material
CREATE TABLE Material (
    idMt INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nombreMaterial VARCHAR(50) NOT NULL,
    idT INT NOT NULL,
    idP INT NOT NULL,
    CONSTRAINT idT_FK FOREIGN KEY (idT) REFERENCES Tarea(idT),
    CONSTRAINT idP_Mat_FK FOREIGN KEY (idP) REFERENCES Proyecto(idP)
);

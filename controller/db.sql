-- Schema task
DROP SCHEMA IF EXISTS task;
CREATE SCHEMA IF NOT EXISTS task DEFAULT CHARACTER SET utf8;
USE task;

-- Table task.Usuario
CREATE TABLE IF NOT EXISTS task.Usuario (
  id_user INT NOT NULL AUTO_INCREMENT,
  usuario VARCHAR(45) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  contraseña VARCHAR(45) NOT NULL,
  creación DATETIME(0) NULL,
  PRIMARY KEY (id_user),
  UNIQUE KEY unique_usuario (usuario)
);

-- Table task.Tareas
CREATE TABLE IF NOT EXISTS task.Tareas (
  id_task INT NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  creacion DATETIME(0) NULL,
  usuario INT NOT NULL,
  PRIMARY KEY (id_task),
  INDEX fk_Tareas_Usuario_idx (usuario ASC),
  CONSTRAINT fk_Tareas_Usuario
    FOREIGN KEY (usuario)
    REFERENCES task.Usuario (id_user)
);

INSERT INTO Usuario VALUES (1, 'Diegody', 'Diego Cardenas', '1234', (SELECT SYSDATE() FROM DUAL));
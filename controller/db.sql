-- -----------------------------------------------------
-- Schema task
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS task;
CREATE SCHEMA IF NOT EXISTS task DEFAULT CHARACTER SET utf8 ;
USE task ;

-- Table task.Usuario
CREATE TABLE IF NOT EXISTS task.Usuario (
  id_user INT NOT NULL,
  user VARCHAR(45) NOT NULL,
  nombre VARCHAR(45) NOT NULL,
  password VARCHAR(45) NOT NULL,
  PRIMARY KEY (id_user));


-- Table task.Tareas
CREATE TABLE IF NOT EXISTS task.Tareas (
  id_task INT NOT NULL,
  descripcion VARCHAR(500) NOT NULL,
  usuario INT NOT NULL,
  PRIMARY KEY (id_task),
  INDEX fk_Tareas_Usuario_idx (usuario ASC),
  CONSTRAINT fk_Tareas_Usuario
    FOREIGN KEY (usuario)
    REFERENCES task.Usuario (id_user)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
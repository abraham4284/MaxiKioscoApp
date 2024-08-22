-- MySQL Workbench Synchronization
-- Generated: 2024-01-24 20:23
-- Model: New Model
-- Version: 1.0
-- Project: Name of the project
-- Author: Abrah

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

CREATE SCHEMA IF NOT EXISTS `MaxiKiosco` DEFAULT CHARACTER SET utf8 ;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Clientes` (
  `idClientes` INT(11) NOT NULL AUTO_INCREMENT,
  `CUIT` VARCHAR(11) NULL DEFAULT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  `Apellido` VARCHAR(45) NULL DEFAULT NULL,
  `Correo` VARCHAR(255) NULL DEFAULT NULL,
  `Domicilio` VARCHAR(255) NULL DEFAULT NULL,
  PRIMARY KEY (`idClientes`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Usuarios` (
  `idUsuarios` INT(11) NOT NULL AUTO_INCREMENT,
  `Username` VARCHAR(100) NULL DEFAULT NULL,
  `Password` VARCHAR(250) NULL DEFAULT NULL,
  PRIMARY KEY (`idUsuarios`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Registraciones` (
  `idRegistraciones` INT(11) NOT NULL AUTO_INCREMENT,
  `Fecha` VARCHAR(45) NULL DEFAULT NULL,
  `Producto` VARCHAR(100) NULL DEFAULT NULL,
  `PrecioU` DECIMAL(18,2) NULL DEFAULT NULL,
  `Cantidad` DECIMAL(18,2) NULL DEFAULT NULL,
  `Total` DECIMAL(18,2) NULL DEFAULT NULL,
  `idClientes` INT(11) NOT NULL,
  `idProductos` INT(11) NOT NULL,
  PRIMARY KEY (`idRegistraciones`),
  INDEX `fk_Registraciones_Clientes_idx` (`idClientes` ASC) VISIBLE,
  INDEX `fk_Registraciones_Productos1_idx` (`idProductos` ASC) VISIBLE,
  CONSTRAINT `fk_Registraciones_Clientes`
    FOREIGN KEY (`idClientes`)
    REFERENCES `MaxiKiosco`.`Clientes` (`idClientes`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Registraciones_Productos1`
    FOREIGN KEY (`idProductos`)
    REFERENCES `MaxiKiosco`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Productos` (
  `idProductos` INT(11) NOT NULL AUTO_INCREMENT,
  `CodeBar` VARCHAR(50) NULL DEFAULT NULL,
  `Descripcion` VARCHAR(250) NULL DEFAULT NULL,
  `Precio` DECIMAL(18,2) NULL DEFAULT NULL,
  `Stock` DECIMAL(18,2) NULL DEFAULT NULL,
  `Familia` VARCHAR(45) NULL DEFAULT NULL,
  `idProveedores` INT(11) NOT NULL,
  PRIMARY KEY (`idProductos`),
  INDEX `fk_Productos_Proveedores1_idx` (`idProveedores` ASC) VISIBLE,
  CONSTRAINT `fk_Productos_Proveedores1`
    FOREIGN KEY (`idProveedores`)
    REFERENCES `MaxiKiosco`.`Proveedores` (`idProveedores`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Proveedores` (
  `idProveedores` INT(11) NOT NULL AUTO_INCREMENT,
  `CUIT` VARCHAR(11) NULL DEFAULT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  `Correo` VARCHAR(100) NULL DEFAULT NULL,
  `Domicilio` VARCHAR(150) NULL DEFAULT NULL,
  PRIMARY KEY (`idProveedores`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`MovimientoStock` (
  `idMovimientoStock` INT(11) NOT NULL AUTO_INCREMENT,
  `Fecha` VARCHAR(45) NULL DEFAULT NULL,
  `CodeBar` VARCHAR(50) NULL DEFAULT NULL,
  `Descripcion` VARCHAR(100) NULL DEFAULT NULL,
  `Motivo` VARCHAR(45) NULL DEFAULT NULL,
  `Cantidad` DECIMAL(18,2) NULL DEFAULT NULL,
  `idProductos` INT(11) NOT NULL,
  PRIMARY KEY (`idMovimientoStock`),
  INDEX `fk_MovimientoStock_Productos1_idx` (`idProductos` ASC) VISIBLE,
  CONSTRAINT `fk_MovimientoStock_Productos1`
    FOREIGN KEY (`idProductos`)
    REFERENCES `MaxiKiosco`.`Productos` (`idProductos`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `MaxiKiosco`.`Login` (
  `idLogin` INT(11) NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(500) NULL DEFAULT NULL,
  `Fecha` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `id_Usuarios` INT(11) NOT NULL,
  PRIMARY KEY (`idLogin`),
  INDEX `fk_Login_Usuarios1_idx` (`id_Usuarios` ASC) VISIBLE,
  CONSTRAINT `fk_Login_Usuarios1`
    FOREIGN KEY (`id_Usuarios`)
    REFERENCES `MaxiKiosco`.`Usuarios` (`idUsuarios`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

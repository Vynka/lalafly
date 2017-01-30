-- MySQL Script generated by MySQL Workbench
-- lun 30 ene 2017 13:27:20 CET
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `lalafly` ;

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `lalafly` DEFAULT CHARACTER SET utf8 ;
USE `lalafly` ;

-- -----------------------------------------------------
-- Table `lalafly`.`ciudad`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`ciudad` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`ciudad` (
  `idCiudad` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  PRIMARY KEY (`idCiudad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lalafly`.`aeropuerto`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`aeropuerto` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`aeropuerto` (
  `idAeropuerto` INT NOT NULL,
  `codigo` INT NULL,
  `nombre` VARCHAR(45) NULL,
  `categoria` INT NULL,
  `ciudad_idCiudad` INT NOT NULL,
  PRIMARY KEY (`idAeropuerto`, `ciudad_idCiudad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lalafly`.`vueloGenerico`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`vueloGenerico` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`vueloGenerico` (
  `nVuelo` INT NULL,
  `horaSalida` DATE NULL,
  `horaLlegada` DATE NULL,
  `precio` DECIMAL NULL,
  `capacidad` INT NULL,
  `idVueloGenerico` INT NOT NULL,
  `aeropuerto_idAeropuerto` INT NOT NULL,
  `aeropuerto_ciudad_idCiudad` INT NOT NULL,
  PRIMARY KEY (`idVueloGenerico`, `aeropuerto_idAeropuerto`, `aeropuerto_ciudad_idCiudad`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lalafly`.`aerolinea`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`aerolinea` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`aerolinea` (
  `idAerolinea` INT NOT NULL,
  `codigo` INT NULL,
  `nombre` VARCHAR(45) NULL,
  `vueloGenerico_idVueloGenerico` INT NOT NULL,
  PRIMARY KEY (`idAerolinea`, `vueloGenerico_idVueloGenerico`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lalafly`.`vuelo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`vuelo` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`vuelo` (
  `idVuelo` INT NOT NULL,
  `fecha` DATE NULL,
  `plazasLibres` INT NULL,
  `vueloGenerico_idVueloGenerico` INT NOT NULL,
  PRIMARY KEY (`idVuelo`, `vueloGenerico_idVueloGenerico`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `lalafly`.`reservas`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `lalafly`.`reservas` ;

CREATE TABLE IF NOT EXISTS `lalafly`.`reservas` (
  `idReservas` INT NOT NULL,
  `nReserva` INT NULL,
  `nombre` VARCHAR(45) NULL,
  `apellido1` VARCHAR(45) NULL,
  `apellido2` VARCHAR(45) NULL,
  `telefono` INT NULL,
  `tarjeta` INT NULL,
  `importe` DECIMAL NULL,
  `vuelo_idVuelo` INT NOT NULL,
  `vuelo_vueloGenerico_idVueloGenerico` INT NOT NULL,
  PRIMARY KEY (`idReservas`, `vuelo_idVuelo`, `vuelo_vueloGenerico_idVueloGenerico`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

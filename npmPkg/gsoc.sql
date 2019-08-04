-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gsoc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gsoc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `gsoc` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `gsoc` ;

-- -----------------------------------------------------
-- Table `gsoc`.`Users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gsoc`.`Users` (
  `idUsers` INT NOT NULL AUTO_INCREMENT,
  `userName` VARCHAR(255) NOT NULL,
  `userMail` VARCHAR(45) NOT NULL,
  `userPass` VARCHAR(255) CHARACTER SET 'utf8' NOT NULL,
  PRIMARY KEY (`idUsers`))
ENGINE = InnoDB
AUTO_INCREMENT = 1;


-- -----------------------------------------------------
-- Table `gsoc`.`tbsensors`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gsoc`.`tbsensors` (
  `sensorID` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `description` VARCHAR(255) NULL DEFAULT NULL,
  `register` DATETIME NULL DEFAULT NULL,
  `location` GEOMETRY NULL DEFAULT NULL,
  `lastUpdate` DATETIME NULL DEFAULT NULL,
  `unit` VARCHAR(255) NULL DEFAULT NULL,
  `imgId` INT(11) NULL DEFAULT NULL,
  `userID` INT NOT NULL,
  PRIMARY KEY (`sensorID`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE,
  INDEX `UserID_idx` (`userID` ASC) VISIBLE,
  CONSTRAINT `UserID`
    FOREIGN KEY (`userID`)
    REFERENCES `gsoc`.`Users` (`idUsers`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `gsoc`.`tbvalues`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `gsoc`.`tbvalues` (
  `valueID` INT(11) NOT NULL AUTO_INCREMENT,
  `sensorID` INT(11) NOT NULL,
  `value` DECIMAL(18,4) NOT NULL,
  `date` DATETIME NOT NULL,
  PRIMARY KEY (`valueID`),
  INDEX `sensorID` (`sensorID` ASC) VISIBLE,
  CONSTRAINT `tbvalues_ibfk_1`
    FOREIGN KEY (`sensorID`)
    REFERENCES `gsoc`.`tbsensors` (`sensorID`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

 -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema gsoc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema gsoc
-- -----------------------------------------------------

CREATE SCHEMA gsoc
-- -----------------------------------------------------
-- Table gsoc.users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gsoc.tbusers (
  userID serial NOT NULL  ,
  userName VARCHAR(255) NOT NULL,
  userMail VARCHAR(45) NOT NULL,
  userPass VARCHAR(255) NOT NULL,
  PRIMARY KEY (userID));

-- -----------------------------------------------------
-- Table gsoc.tbsensors
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gsoc.tbsensors (
  sensorID serial NOT NULL,
  name VARCHAR(255) NOT NULL unique,
  description VARCHAR(255) NULL DEFAULT NULL,
  register TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NULL,
  Y decimal (10,4) ,
  X decimal (10,4),
  lastUpdate TIMESTAMP WITHOUT TIME ZONE NULL DEFAULT NULL,
  unit VARCHAR(255) NULL DEFAULT NULL,
  imgId VARCHAR(255) NULL DEFAULT NULL,
  userID INT NOT NULL,
  PRIMARY KEY (sensorID),
  CONSTRAINT UserID
    FOREIGN KEY (userID)
    REFERENCES gsoc.tbusers (userID)
	   ON DELETE CASCADE
    ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table gsoc.tbvalues
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS gsoc.tbvalues (
  valueID serial NOT NULL ,
  sensorID INT NOT NULL,
  value DECIMAL(18,4) NOT NULL,
  date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
  PRIMARY KEY (valueID),
  CONSTRAINT tbvalues_ibfk_1
    FOREIGN KEY (sensorID)
    REFERENCES gsoc.tbsensors (sensorID)
    ON DELETE CASCADE
    ON UPDATE CASCADE);
	
create table if not exists gsoc.tbLG(
	lgID serial not null,
	url varchar(255),
	userID int,
	PRIMARY KEY (lgID),
	constraint tbvalues_ibfk_1
		foreign key (userID)
		references gsoc.tbusers (userID)
	    ON DELETE CASCADE
    ON UPDATE CASCADE
)


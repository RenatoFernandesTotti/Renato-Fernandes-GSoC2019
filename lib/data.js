const db = require("mysql")
const fs = require('fs')

var schema;
var template = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
}
var connetion



var exports = module.exports = {}


exports.createConnection = async (config = template) => {
    return new Promise((resolve, reject) => {
        schema = config.database
        Object.freeze(schema)
        connetion = exports.con = db.createConnection(config)
        connetion.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err)
            }

            connetion.query('Select 1 from tbSensors', (err) => {
                if (err) {

                    console.log('No tables detected, creating defaults');
                    setTimeout(() => {
                        connetion.query("Create table gsoc.tbSensors (sensorID int primary key NOT NULL AUTO_INCREMENT,name varchar(255),description varchar(255),register datetime,lastUpdate datetime,ip varchar(255),unit varchar(255))")
                        connetion.query("Create table gsoc.tbValues (valueID int primary key NOT NULL AUTO_INCREMENT, sensorID int, foreign key (sensorID) references gsoc.tbSensors(sensorID), value decimal(18,4), date datetime)")
                        console.log('Done!');
                        resolve()
                    }, 3000)

                } else {
                    console.log('Everything ok, continuing....');
                    resolve()

                }
            })
        })

    })



}

exports.getInfo = (sensorID) => {
    return new Promise((resolve, reject) => {

        if (connetion == null) {
            reject("Not connected to a database")
        }
        connetion.query('select sensorID from tbSensors')
        connetion.query('Select * from ?? where `sensorID` = ?', ['tbSensors', sensorID], function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });

    })

}

exports.registerSensor = (info = {
    name: "",
    description: "",
    ip: "",
    unit:""
}) => {
    return new Promise((resolve, reject) => {
        if (exports.con == "null") {
            reject("Not connected to a database")
        }
        connetion.query('insert into tbSensors (name,description,register,lastUpdate,ip,unit) values(?,?,now(),now(),?,?)', [info.name, info.description, info.ip,info.unit], function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });

    })
}

exports.resgisterRead = (sensorId, value) => {
    return new Promise((resolve, reject) => {
        if (exports.con == "null") {
            reject("Not connected to a database")
        }
        connetion.query('insert into tbValues (sensorID,value) values (?,?)', [sensorId, value], function (error, results, fields) {
            if (error) reject(error);
            connetion.query('update tbSensors set lastUpdate = now() where sensorID = ?', [sensorId], function (error, results, fields) {
                if (error) reject(connetion.rollback())
                resolve(results)
            })

        });

    })

}


exports.editSensor = (sensorId, info = {name: "",description: "",ip: "",unit:""}) => {
    return new Promise((resolve, reject) => {
        if(sensorId==undefined){
            reject("sensorID needs to be set")
        }
        console.log(info);
        
        var updateQuery = "update tbSensors set"
        var values = []
        if (info.name != undefined) {
            updateQuery += ' name = ? ,'
            values.push(info.name)
        }
        if (info.description != undefined) {
            updateQuery += ' description = ? ,'
            values.push(info.description)
        }
        if (info.ip != undefined) {
            updateQuery += ' ip = ? ,'
            values.push(info.ip)
        }
        if(info.unit!=undefined){
            updateQuery += ' unit = ? ,'
            values.push(info.unit)
        }
        console.log(values);
        updateQuery=  updateQuery.substring(0, updateQuery.length - 1);
        console.log(updateQuery);
        updateQuery+=" where sensorID = ?"
        values.push(sensorId)
        
        connetion.query(updateQuery, values, (error, results, fields) => {
            if (error) reject(error)
            resolve(results)

        })
    })


}

exports.readSensor = (sensorID)=>{
    return new Promise ((resolve,reject)=>{
        connetion.query('select tbSensors.sensorID  from tbValues inner join tbSensors on tbValues.sensorID = tbSensors.sensorID where tbSensors.sensorID = ?',[sensorID],(error, results, fields)=>{
            if(error) reject(error)
            resolve(results)
        })
    })
}


exports.generateKml = () => {

}


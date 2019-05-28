const db = require("mysql")
var schema;
var template = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
}
var exports = module.exports = {}
var connetion;

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
                    console.log(err);
                    
                    console.log('No tables detected, creating defaults');
                    setTimeout(() => {
                        connetion.query("Create table gsoc.tbSensors (sensorID int primary key NOT NULL AUTO_INCREMENT,name varchar(255),description varchar(255),register datetime,lastUpdate datetime,ip varchar(255))")
                        connetion.query("Create table gsoc.tbValues (valueID int primary key NOT NULL AUTO_INCREMENT, sensorID int, foreign key (sensorID) references gsoc.tbSensors(sensorID), value decimal(18,4))")
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

exports.registerSensor = (info={name:"",description:"",ip:""}) => {
    return new Promise((resolve, reject) => {
        if (exports.con == "null") {
            reject("Not connected to a database")
        }
        connetion.query('insert into tbSensors (name,description,register,lastUpdate,ip) values(?,?,now(),now(),?)', [info.name, info.description,info.ip], function (error, results, fields) {
            if (error) reject(error);
            resolve(results)
        });

    })
}

exports.resgisterRead = (sensorId,value)=>{
    return new Promise((resolve, reject) => {
        if (exports.con == "null") {
            reject("Not connected to a database")
        }
        connetion.query('insert into tbValues (sensorID,value) values (?,?)', [sensorId, value], function (error, results, fields) {
            if (error) reject(error);
            connetion.query('update tbSensors set lastUpdate = now() where sensorID = ?',[sensorId],function (error, results, fields) {
                if(error) reject(connetion.rollback())
                resolve(results)
            })

        });

    })

}


exports.editSensor = (sensorId,info={})=>{
    return new Promise ((resolve,reject)=>{
        
    })
}


exports.generateKml = () => {

}
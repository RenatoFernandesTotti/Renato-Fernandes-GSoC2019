//Dependancies
const db = require("mysql")
const fs = require('fs')
const crypto = require('crypto')


const convert = (from, to) => str => Buffer.from(str, from).toString(to)
const utf8ToHex = convert('utf8', 'hex')
const hexToUtf8 = convert('hex', 'utf8')


//Packages viariables
var demoInterval = null;
var mockSensorsId = []
var mockSensorsNames = []
var schema;
var template = {
    host: '',
    port: 3306,
    user: '',
    password: '',
    database: ''
}
var connetion

//Export module
var exports = module.exports = {}


exports.createConnection = async (config = template) => {
    return new Promise((resolve, reject) => {
        var file = fs.createReadStream(__dirname + '/gsoc.sql')
        schema = config.database
        Object.freeze(schema)
        connetion = exports.con = db.createConnection(config)
        connetion.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err)
                return
            }
            connetion.query('Select 1 from tbSensors', (err) => {
                if (err) {

                    file = file.read().toString()


                    setTimeout(() => {
                        connetion.query(file)

                        resolve()
                    }, 3000)
                } else {

                    resolve()
                }
            })
        })
    })
}

exports.getInfo = (name) => {
    return new Promise((resolve, reject) => {
        if (connetion == null) {
            reject("Not connected to a database")
            return
        }
        getSensorID(name).then(id => {
            connetion.query('select sensorID from tbSensors')
            connetion.query('Select * from ?? where `sensorID` = ?', ['tbSensors', id], function (error, results, fields) {
                if (error) reject(error);
                resolve(results)
            });
        })
    })
}

exports.registerSensor = (username, {
    name = "Default sensor n: " + Math.random(),
    description = "Default description",
    unit = "To be set",
    lat = 0,
    lon = 0,
    imgId = 1,
} = {}) => {
    return new Promise((resolve, reject) => {
        if (exports.con == "null") {
            reject("Not connected to a database")
            return
        }
        if (username == undefined) {
            reject('No username set')
            return
        }
        getUserId(username).then(userId => {
            connetion.query("insert into tbSensors (name,description,register,lastUpdate,unit,location,imgId,userId) values(?,?,now(),now(),?,ST_GeomFromText('POINT(? ?)', 4326),?,?)", [name, description, unit, lon, lat, imgId, userId], function (error, results, fields) {
                if (error) {
                    reject(error);
                    return
                }

                resolve(results)
            });
        })
    })
}

exports.registerUser = ({
    userName = null,
    userPass = null,
    userMail = null
} = {}) => {
    return new Promise((resolve, reject) => {
        var vars = []
        var hash =userPass
        vars.push(userName)
        vars.push(userMail)
        for (i=0 ; i<100 ; i++) {
            hash=crypto.createHash('sha512').update(hash).digest('hex')
        }
        vars.push(hash)
        connetion.query("insert into users (userName,userMail,userPass) values(?,?,?)", vars, function (error, results, fields) {
            if (error) {
                reject(error);
                return
            }

            resolve(results)
        })
    })
}

exports.registerRead = (name, value, decimal, hex = false) => {
    return new Promise((resolve, reject) => {

        hex = Boolean(hex)
        if (exports.con == "null") {
            reject("Not connected to a database")
        }
        if (hex) {
            value = (parseFloat(hexToUtf8(value.toString())).toFixed(decimal)) / Math.pow(10, decimal)


        }
        getSensorID(name).then(id => {
                connetion.query('insert into tbValues (sensorID,value,date) values (?,?,now())', [id, value], function (error, results, fields) {
                    if (error) {
                        reject(error)
                        return
                    }
                    connetion.query('update tbSensors set lastUpdate = now() where sensorID = ?', [id], function (error, results, fields) {
                        if (error) {
                            reject(connetion.rollback())
                            return
                        }
                        resolve(results)
                        return
                    })
                });
            })
            .catch(() => {

                exports.registerSensor({
                    name: name,
                    lat: 0,
                    lon: 0,
                    unit: null
                }).then(() => {
                    exports.registerRead(name, value)
                })


            })
    })

}


exports.editSensor = (name, info = {
    name: "",
    description: "",
    ip: "",
    unit: "",
    lon: "",
    lat: ""
}) => {
    return new Promise((resolve, reject) => {
        getSensorID(name).then(id => {
            if (id == undefined) {
                reject("id not found")
                return
            }
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
            if (info.unit != undefined) {
                updateQuery += ' unit = ? ,'
                values.push(info.unit)
            }
            if (info.lon != undefined) {
                updateQuery += 'lon = ? ,'
                values.push(info.lon)
            }

            updateQuery = updateQuery.substring(0, updateQuery.length - 1);

            updateQuery += " where sensorID = ?"
            values.push(id)
            connetion.query(updateQuery, values, (error, results, fields) => {
                if (error) reject(error)
                resolve(results)
            })
        })
    })
}

exports.readSensor = (name, datespan = null) => {
    return new Promise((resolve, reject) => {
        
        getSensorID(name).then(id => {
            let date = getDate()
            console.log(date);
            
            let query = "select T1.sensorID, T1.unit, T2.value, T2.date  from tbValues T2 inner join tbSensors as T1 on T2.sensorID = T1.sensorID where T1.sensorID = ?"
            switch (datespan) {
                case '1y':
                    query += " and year(T2.date) between " + (date[2] - 1) + " and " + date[2]
                    break;
                case '6m':
                    var last = new Date()
                    last.setMonth(date[1] - 6)
                    query += " and month(T2.date) between " + (last.getMonth() + 1) + " and " + date[1]
                    break;
                case '1m':
                    var last = new Date()
                    last.setMonth(date[1] - 2)
                    console.log(last.getMonth());
                    query += " and month(T2.date) between " + (last.getMonth() + 1) + " and " + date[1]
                    break;
                case '1w':
                    var last = new Date()
                    last.setDate(date[0] - 7)
                    query += " and T2.date between " + "'" +last.toISOString() + "'" + " and " + "'"+new Date().toISOString()+ "'"
                    break;
                case '1d':
                    var last = new Date()
                    last.setDate(date[0] - 1)
                    query += " and T2.date between " + "'" +last.toISOString() + "'" + " and " + "'"+new Date().toISOString()+ "'"
                    break;
                default:
                    break;
            }
            console.log(query);
            query += ' order by T2.date'
            connetion.query(query, [id], (error, results, fields) => {
                if (error) {


                    reject(error)
                    return
                }
                if (results.length == 0) {


                    reject('No readings were found for the sensor: ' + name)
                    return
                }
                console.log(results);
                
                resolve(results)
            })
        })
    })
}

exports.generateKml = () => {
    return new Promise((resolve, reject) => {
        reject("To be implemented")
    })
}

exports.startDemo = (sensorNumber, user, interval = 10) => {
    return new Promise((resolve, reject) => {
        if (sensorNumber == 0) {
            reject("Sensor number can't be 0")
            return
        }
        var unitArray = ['Pascal', 'CO2', 'Nitrogen', 'Air speed', 'Soil Moisture']
        mockSensorsNames.push("Mock sensor " + index)
        exports.registerSensor(user, {
                name: "Mock sensor " + index,
                description: "Mock sensor for a demo presentation",
                unit: unitArray[Math.floor(Math.random() * unitArray.length)],
                imgId: Math.floor(Math.random() * 2) + 1
            })
            .then(results => {
                mockSensorsId.push(results.insertId)
            })
            .catch(err => {
                reject("A error has ocurred in the mock sensors insertion on the Database: " + err)
            })
        demoInterval = setInterval(() => {
            exports.registerRead(mockSensorsNames[Math.floor(Math.random() * mockSensorsId.length)], Math.floor(Math.random() * 5000))

        }, interval * 1000)

    })
}




exports.stopDemo = () => {
    return new Promise((resolve, reject) => {
        clearInterval(demoInterval)
        demoInterval = null
        mockSensorsId.forEach(id => {
            connetion.query('Delete from tbSensors where sensorID = ?', [id])
        });
        mockSensorsId = []
    })
}


exports.getAllSensors = () => {
    return new Promise((resolve, reject) => {
        connetion.query('select * from gsoc.tbSensors', (error, results, fields) => {
            if (error) {
                reject(error)
                return
            }
            resolve(results)
            return
        })

    })
}

/**
 * Check database for the longitude e latitude
 * @param {String} name
 * @returns {Promise} new Promise resolve() reject()
 */
exports.getSensorPosition = (name) => {
    return new Promise((resolve, reject) => {
        getSensorID(name)
            .then(id => {
                connetion.query('SELECT ST_Latitude(location) as lat,ST_Longitude(location) as lon FROM gsoc.tbsensors where sensorID = ?', [id], (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }

                    resolve([results[0].lat, results[0].lon])
                })
            })
    })
}

exports.getUser = (param) => {
    return new Promise((resolve, reject) => {
        connetion.query('Select * from users where userName = ? or userMail = ? or idUsers = ?', [param, param, param], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            if (typeof results[0] == 'undefined') {
                reject("User Not found")
                return
            }
            resolve(results[0])
            return

        })
    })
}


const getSensorID = (name) => {
    return new Promise((resolve, reject) => {
        connetion.query('Select sensorID from gsoc.tbSensors where name = ?', [name], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            if (typeof results[0] == 'undefined') {
                reject(" sensor Not found")
                return
            }
            resolve(results[0].sensorID)
            return
        })
    })
}

const getUserId = (name) => {
    return new Promise((resolve, reject) => {
        connetion.query('Select idUsers from users where userName = ?', [name], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            if (typeof results[0] == 'undefined') {
                reject("user Not found")
                return
            }
            resolve(results[0].idUsers)
            return
        })
    })
}

const getDate = () => {
    var today = new Date();
    var dd = today.getDate()
    var mm = today.getMonth() + 1
    var yyyy = today.getFullYear();

    return [dd, mm, yyyy]
}
//Dependancies
const { Pool, Client } = require('pg')
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
    user: 'dbuser',
    host: 'database.server.com',
    database: 'mydb',
    password: 'secretpassword',
    port: 3211,
  }
var connetion

//Export module
var exports = module.exports = {}

exports.con=null 

exports.createConnection = async (config,op=true) => {
    return new Promise((resolve, reject) => {
        var file = fs.createReadStream(__dirname + '/data.sql')
        if(op)
            connetion = exports.con = new Pool(config)
        else
            connetion = exports.con = new Pool()
        connetion.connect(function (err) {
            if (err) {
                console.error('error connecting: ' + err.stack);
                reject(err)
                return
            }
            connetion.query('Select 1 from gsoc.tbSensors', (err) => {
                if (err) {

                    file = file.read().toString()


                    setTimeout(() => {
                        connetion.query(file)

                        resolve()
                    }, 3000)
                } else {
                    connetion.query('SET search_path TO gsoc').then(re=>{
                        
                    })
                    resolve('ok')
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
            //connetion.query('select sensorID from gsoc.tbSensors')
            
            connetion.query('Select * from gsoc.tbSensors where sensorID = $1', [id], function (error, results, fields) {
                if (error) 
                    return reject(error);
                    
                resolve(results.rows[0])
            });
        })
    })
}

exports.readUserSensors = (name)=>{
    return new Promise ((resolve,reject)=>{
        getUserId(name).then(id=>{
            connetion.query('select * from gsoc.tbSensors where userID = $1',[id],function (error, results, fields) {
                if (error) reject(error);
                resolve(results.rows)
            })
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
            connetion.query("insert into gsoc.tbSensors (name,description,register,lastUpdate,unit,X,Y,imgId,userId) values($1,$2,now(),now(),$3,$4, $5,$6,$7)", [name, description, unit, lon, lat, imgId, userId], function (error, results, fields) {
                if (error) {
                    reject(error);
                    return
                }

                resolve(results.rows)
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
        connetion.query("insert into gsoc.tbusers (userName,userMail,userPass) values($1,$2,$3)", vars, function (error, results, fields) {
            if (error) {
                reject(error);
                return
            }

            resolve(results.rows)
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
                connetion.query('insert into gsoc.tbValues (sensorID,value,date) values ($1,$2,now())', [id, value], function (error, results, fields) {
                    if (error) {
                        reject(error)
                        return
                    }
                    connetion.query('update gsoc.tbSensors set lastUpdate = now() where sensorID = $1', [id], function (error, results, fields) {
                        if (error) {
                            reject(connetion.rollback())
                            return
                        }
                        resolve(results.rows)
                        return
                    })
                });
            })
            .catch(() => {
                return reject()
            })
    })

}


exports.editSensor = (name, info = {
    name: "",
    description: "",
    unit: "",
    lon: "",
    lat: "",
    img:""
}) => {
    return new Promise((resolve, reject) => {
        getSensorID(name).then(id => {
            if (id == undefined) {
                reject("id not found")
                return
            }
            var i =1;
            var updateQuery = "update gsoc.tbSensors set"
            var values = []
            if (info.name != undefined) {
                updateQuery += ' name = $'+i+','
                values.push(info.name)
                i++
            }
            if (info.description != undefined) {
                updateQuery += ' description = $'+i+' ,'
                values.push(info.description)
                i++
            }
            if (info.ip != undefined) {
                updateQuery += ' ip = $'+i+' ,'
                values.push(info.ip)
                i++
            }
            if (info.unit != undefined) {
                updateQuery += ' unit = $'+i+' ,'
                values.push(info.unit)
                i++
            }
            if (info.lon != undefined && info.lat) {
                console.log(updateQuery);
                updateQuery += " X=$"+i+", y=$"+(i+1)+" ,"
                values.push(info.lon)
                values.push(info.lat)
                i+=2
            }
            if (info.img!=undefined) {
                updateQuery += " imgId = $"+i+" ,"
                values.push(info.img)
                i++
            }
            
            updateQuery = updateQuery.substring(0, updateQuery.length - 1);

            updateQuery += " where sensorID = $"+i
            values.push(id)
            connetion.query(updateQuery, values, (error, results, fields) => {
                if (error) reject(error)
                resolve()
            })
        })
    })
}

exports.readSensor = (name, datespan = null) => {
    return new Promise((resolve, reject) => {
        
        getSensorID(name).then(id => {
            let date = getDate()
            
            
            let query = "select T1.sensorID, T1.unit, T2.value, T2.date  from gsoc.tbValues T2 inner join gsoc.tbSensors as T1 on T2.sensorID = T1.sensorID where T1.sensorID = $1"
            switch (datespan) {
                case '1y':
                    query += " and date_part('year', T2.date) between " + (date[2] - 1) + " and " + date[2]
                    
                    break;
                case '6m':
                    var last = new Date()
                    last.setMonth(date[1] - 6)
                    query += " and date_part('month', T2.date) between " + (last.getMonth() + 1) + " and " + date[1]
                    break;
                case '1m':
                    var last = new Date()
                    last.setMonth(date[1] - 2)
                    query += " and date_part('month', T2.date) between " + (last.getMonth() + 1) + " and " + date[1]
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
            query += ' order by T2.date'
            
            connetion.query(query, [id], (error, results, fields) => {
                if (error) {
                    return reject(error)
                }
                if (results.length == 0) {
                    return reject({code:0,message:"No values found for sensor:" + name})
                }
                
                
                resolve(results.rows)
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
            connetion.query('Delete from gsoc.tbSensors where sensorID = $1', [id])
        });
        mockSensorsId = []
    })
}


exports.getAllSensors = () => {
    return new Promise((resolve, reject) => {
        connetion.query('select gsoc.tbSensors.name , gsoc.tbusers.username  from gsoc.tbSensors inner join gsoc.tbusers on gsoc.tbSensors.userid = gsoc.tbusers.userid', (error, results, fields) => {
            if (error) {
                reject(error)
                return
            }
            resolve(results.rows)
            return
        })

    })
}

exports.getFullSensors = () => {
    return new Promise((resolve, reject) => {
        connetion.query('select *  from gsoc.tbSensors', (error, results, fields) => {
            if (error) {
                reject(error)
                return
            }
            resolve(results.rows)
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
                connetion.query('SELECT X as lat, Y as lon FROM gsoc.gsoc.tbsensors where sensorID = $1', [id], (error, results, fields) => {
                    if (error) {
                        reject(error)
                        return
                    }

                    resolve([results.rows[0].lat, results.rows[0].lon])
                })
            })
    })
}

exports.getUser = (param) => {
    return new Promise((resolve, reject) => {
        console.log(param);
        
        var query='Select * from gsoc.tbusers where'
        if(typeof param == 'number'){
            query+=" userID = $1"
        }   
        else{
            query=query+" username = $1 or usermail = $1"
        }
        
        connetion.query(query, [param], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            console.log(results);
            
            if (typeof results.rows[0] == 'undefined') {
                reject("User Not found")
                return
            }
            resolve(results.rows[0])
            return

        })
    })
}

exports.deleteSensor = (name)=>{
    return new Promise ((resolve,reject)=>{
        getSensorID(name).then(id=>{
            connetion.query('delete from gsoc.tbsensors where sensorID = $1',[id],function (error, results, fields) {
                if (error) {
                    reject(error)
                    return
                }
                if (typeof results.rows[0] == 'undefined') {
                    reject("sensor not found")
                    return
                }
                resolve(results.rows[0])
                return
    
            })
        })
    })
}


const getSensorID = (name) => {
    return new Promise((resolve, reject) => {
        
        connetion.query('Select sensorID from gsoc.tbSensors where name = $1', [name], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            
            if (typeof results.rows[0] == 'undefined') {
                reject(" sensor Not found")
                return
            }
            resolve(results.rows[0].sensorid)
            return
        })
    })
}

const getUserId = (name) => {
    return new Promise((resolve, reject) => {
        connetion.query('Select userID from gsoc.tbusers where userName = $1', [name], function (error, results, fields) {
            if (error) {
                reject(error)
                return
            }
            console.log(results);
            
            if (typeof results.rows[0] == 'undefined') {
                reject("user Not found")
                return
            }
            resolve(results.rows[0].userid)
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
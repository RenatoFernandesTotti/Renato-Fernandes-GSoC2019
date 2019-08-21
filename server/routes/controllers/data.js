const router = require('express').Router()
const GSoC = require('liquidsensors')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
const fs = require('fs')
const Client = require('ssh2').Client
const Clientscp = require('scp2').Client;
const keys = require('../../keys')

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection(keys)

router.post('/registerRead', (req, res) => {
    console.log(req.body);
    
    GSoC.registerRead(req.body.name, req.body.val, req.body.decimal, req.body.hex).then(result => {
        response.send(res, {
            code: 200
        })
    })

})

router.get('/getAllSensors', (req, res) => {
    GSoC.getAllSensors().then(data => {
        var uniqueNames = [...new Set(data.map(data => data.username))]
        var formatList = []
        uniqueNames.forEach(element => {
            formatList.push({
                name: element,
                sensors: []
            })
        });
        formatList.forEach(owner => {
            data.forEach(element => {
                if (owner.name == element.username) {
                    owner.sensors.push({
                        name: element.name,
                        img: element.imgid
                    })
                }
            });
        });

        response.send(res, {
            code: 200,
            result: formatList
        })
    }).catch(error => {

        response.send(res, {
            code: 503,
            error: error
        })
    })
})

router.get('/getfullsensors', (req, res) => {
    var retorno = new Promise((resolve, reject) => {
        GSoC.getFullSensors().then(re => {
            processArray(re, res)

        })
    })

})
router.get('/getSensorInfo', (req, res) => {

    GSoC.getInfo(req.query.name).then(result => {
        response.send(res, {
            code: 200,
            result: result
        })

    })

})

router.get('/readSensor', (req, res) => {
    if (req.query.datespan == undefined) {
        GSoC.readSensor(req.query.name).then(result => {
            response.send(res, {
                code: 200,
                result: result
            })
        }).catch(err => {
            response.send(res, {
                code: 500,
                error: err
            })
        })
    } else {
        GSoC.readSensor(req.query.name, req.query.datespan).then(result => {
            response.send(res, {
                code: 200,
                result: result
            })

        }).catch(err => {
            if (err.code == 0) {
                response.send(res, {
                    code: 200,
                    result: []
                })
                return
            }
            response.send(res, {
                code: 500,
                error: err
            })
        })
    }
})

router.get('/checkUser', (req, res) => {
    GSoC.getUser(req.query.username).then(result => {

            response.send(res, {
                code: 200,
                messages: [true]
            })
        })
        .catch(err => {

            response.send(res, {
                code: 200,
                messages: [false]
            })
        })
})

router.get('/beurl', (req, res) => {
    response.send(res, {
        code: 200,
        result: process.env.URL
    })
})


router.post('/movelg', (req, res) => {
    console.log("Movelg:",req.body);
    
    let lat = req.body.lat
    let lng = req.body.lng
    let string = 'flytoview=<LookAt><longitude>' + lng + '</longitude><latitude>' + lat +
        '</latitude><altitude>0</altitude><heading>167.0211046386626</heading><tilt>68.68179673613697</tilt><range>100</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>'
    var teste = new Clientscp({
        host: process.env.masterIp,
        username: process.env.user,
        password: process.env.key,
        path: '/tmp/query.txt'
    })

    fs.writeFile(__dirname + '/query.txt', string, () => {
        teste.upload(__dirname + '/query.txt', '/tmp/query.txt', (err) => {

        })
        teste.on('error', (err) => {
            console.log("err",err);
            
            res.send('fail')

        })
        teste.on('end', () => {
            console.log("ok");
            
            res.send('ok')
        })

    })

})

router.post('/opensite', (req, res) => {
    console.log("POST /opensite",req.body);
    
    var conn = new Client();
    conn.on('error', (err) => {
            res.send(err)
        })
        .on('ready', function () {
            conn.exec("export DISPLAY=:0 ; chromium-browser --kiosk " +process.env.localip + req.body.serverurl + " </dev/null >/dev/null 2>&1 &", function (err, stream) {
                if (err) throw err;
                stream.on('close', function (code, signal) {
                    conn.end();
                    res.send('ok')
                    return
                }).on('data', function (data) {
                }).stderr.on('data', function (data) {
                });
            });
        }).connect({
            host: process.env.slaveIp,
            port: 22,
            username: process.env.user,
            password: process.env.key
        });


})

router.post('/closesite', (req, res) => {
    var conn = new Client();
    conn.on('error', () => {
        res.send('fail')
    })
    conn.on('ready', function () {
        conn.exec("export DISPLAY=:0 ; pkill -f chromium-browser", function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                conn.end();
                res.send('ok')
                return
            }).on('data', function (data) {
            }).stderr.on('data', function (data) {
            });
        });
    }).connect({
        host: process.env.slaveIp,
        port: 22,
        username: process.env.user,
        password: process.env.key
    });
})


async function processArray(array, res) {

    for (const element of array) {
        await GSoC.readSensor(element.name).then(r => {
            if(r.length!=0){
            element.value = r[0].value
            element.unit = r[0].unit
            }
        });
    }

    response.send(res, {
        code: 200,
        result: array
    })
}

module.exports = router
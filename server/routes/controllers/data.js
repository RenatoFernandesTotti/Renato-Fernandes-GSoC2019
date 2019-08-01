const router = require('express').Router()
const GSoC = require('liquidsensors')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
var cors = require('cors');
const fs = require('fs')
var Client = require('ssh2').Client
var copy = require('scp2')
var Clientscp = require('scp2').Client;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection({
    user: 'postgres',
    host: 'localhost',
    database: 'gsoc',
    password: 'renato',
    port: 5432
})

router.post('/registerRead', (req, res) => {
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
                    owner.sensors.push(element.name)
                }
            });
        });
        console.log(formatList);

        response.send(res, {
            code: 200,
            result: formatList
        })
    }).catch(error => {
        console.log(error);

        response.send(res, {
            code: 503,
            error: error
        })
    })
})

router.get('/getfullsensors', (req, res) => {
    GSoC.getFullSensors().then(re => {
        response.send(res, {
            code: 200,
            result: re
        })
    })
})
router.get('/getSensorInfo', (req, res) => {
    console.log('Server' + req.query.name);

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
            console.log(err);
            if (err.code == 0) {
                response.send(res, {
                    code: 200,
                    result: []
                })
                return
            }
            console.log('pq nao?');
            response.send(res, {
                code: 500,
                error: err
            })
        })
    }
})

router.get('/checkUser', (req, res) => {
    GSoC.getUser(req.query.username).then(result => {
            console.log("result");

            response.send(res, {
                code: 200,
                messages: [true]
            })
        })
        .catch(err => {
            console.log(err);

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
    let lat = req.body.lat
    let lng = req.body.lng
    let string = 'flytoview=<LookAt><longitude>' + lng + '</longitude><latitude>' + lat +
        '</latitude><altitude>0</altitude><heading>167.0211046386626</heading><tilt>68.68179673613697</tilt><range>100</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>'
    console.log(string);
    console.log(req.body);
    console.log(Clientscp());
    var teste = new Clientscp({
        host: req.body.host,
        username: req.body.username,
        password: req.body.password,
        path: '/tmp/query.txt'
    })
    console.log(teste);
    
    fs.writeFile(__dirname + '/query.txt', string, () => {
        console.log("ok");
        teste.upload(__dirname + '/query.txt','/tmp/query.txt',(err)=>{
            console.log(err);
            
        })
        teste.on('error',()=>{
            console.log('jere');
            res.send('fail')
            
        })
        teste.on('end',()=>{
            res.send('ok')
        })
        // teste.scp(__dirname + '/query.txt', {
        //     host: req.body.host,
        //     username: req.body.username,
        //     password: req.body.password,
        //     path: '/tmp/query.txt'
        // }, function (err) {
        //     if (!err) {
        //         res.send('ok')
        //     } else {
        //         res.send('not ok')
        //     }


        // })
    })

})

router.post('/opensite', (req, res) => {
    console.log(req.body);

    var conn = new Client();
    conn.on('error', (err) => {
            res.send(err)
        })
        .on('ready', function () {
            console.log('Client :: ready');
            conn.exec("export DISPLAY=:0 ; chromium-browser --kiosk " + req.body.serverurl + " </dev/null >/dev/null 2>&1 &", function (err, stream) {
                if (err) throw err;
                stream.on('close', function (code, signal) {
                    console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                    conn.end();
                    res.send('ok')
                    return
                }).on('data', function (data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function (data) {
                    console.log('STDERR: ' + data);
                });
            });
        }).connect({
            host: req.body.lgurl,
            port: 22,
            username: req.body.lguser,
            password: req.body.lgkey
        });


})

router.post('/closesite', (req, res) => {
    var conn = new Client();
    conn.on('error',()=>{
        res.send('fail')
    })
    conn.on('ready', function () {
        console.log('Client :: ready close');
        conn.exec("export DISPLAY=:0 ; pkill -f chromium-browser", function (err, stream) {
            if (err) throw err;
            stream.on('close', function (code, signal) {
                console.log('Stream :: close :: code: ' + code + ', signal: ' + signal);
                conn.end();
                res.send('ok')
                return
            }).on('data', function (data) {
                console.log('STDOUT: ' + data);
            }).stderr.on('data', function (data) {
                console.log('STDERR: ' + data);
            });
        });
    }).connect({
        host: req.body.lgurl,
        port: 22,
        username: req.body.lguser,
        password: req.body.lgkey
    });
})

module.exports = router
const router = require('express').Router()
const GSoC = require('liquidsensors')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
var cors = require('cors');
const fs = require('fs')


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection({
    user: 'postgres',
    host: 'localhost',
    database: 'gsoc',
    password: 'renato',
    port: 5432}
  )

router.post('/registerRead', (req, res) => {
    GSoC.registerRead(req.body.name, req.body.val, req.body.decimal, req.body.hex).then(result => {
        response.send(res, {
            code: 200
        })
    })

})

router.get('/getAllSensors', (req, res) => {
    GSoC.getAllSensors().then(data => {
        response.send(res, {
            code: 200,
            result: data
        })
    }).catch(error => {
        response.send(res, {
            code: 503,
            error: error
        })
    })
})
router.get('/getSensorInfo', (req, res) => {
    console.log('Server'+req.query.name);
    
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
            if(err.code==0){
                response.send(res,{
                    code:200,
                    result:[]
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

router.get('/beurl',(req,res)=>{
    response.send(res,{
        code:200,
        result:process.env.URL
    })
})

router.post('/movelg',(req,res)=>{
    let lat = req.body.lat
    let lng = req.body.lng
    let string='flytoview=<LookAt><longitude>'+lng+'</longitude><latitude>'+lat+
    '</latitude><altitude>0</altitude><heading>167.0211046386626</heading><tilt>68.68179673613697</tilt><range>774.4323347622752</range><altitudeMode>relativeToGround</altitudeMode><gx:altitudeMode>relativeToSeaFloor</gx:altitudeMode></LookAt>'
    fs.writeFile('/tmp/query.txt',string,()=>{
        console.log("ok");
        res.send('ok')
        
    })
})

module.exports = router
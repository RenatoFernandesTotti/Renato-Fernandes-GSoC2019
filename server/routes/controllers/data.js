const router = require('express').Router()
const GSoC = require('liquidsensors')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
var cors = require('cors');


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





module.exports = router
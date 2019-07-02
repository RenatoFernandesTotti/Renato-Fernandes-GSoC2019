const router = require('express').Router()
const GSoC = require('liquidsensors')
var keys = require('../../keys.min')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection(keys)

router.use('/data/*', (req, res, next) => {
        if (!req.isAuthenticated()) {
            res.status(403).send('You are not authenticated')
        } else {
            next()
        }
    }

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
    GSoC.getInfo(req.query.name).then(result => {
        response.send(res, {
            code: 200,
            result: result[0]
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
            console.log(err);

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
                messages:[true]
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
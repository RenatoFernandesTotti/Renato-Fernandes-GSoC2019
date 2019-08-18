const router = require('express').Router()
const GSoC = require('liquidsensors')
const bodyParser = require('body-parser')
const response = require('../../lib/response')
const fs = require('fs')
const Client = require('ssh2').Client
const Clientscp = require('scp2').Client;
const keys = require('../../keys')
const runMiddleware = require('run-middleware');
const axios = require('axios')


runMiddleware(router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection(keys)

router.use(require('./data'))

router.post('/assistant/move', (req, res) => {
    GSoC.getSensorPosition(req.body.name).then(r => {
        console.log("Moving lg");

        router.runMiddleware('/movelg', {
            method: 'post',
            body: {
                lat: r[1],
                lng: r[0],
                host: process.env.masterIp,
                username: process.env.user,
                password: process.env.key
            }
        }, (code, data) => {
            console.log(code, data);
        })
        res.send('Move lg ok')
    })
})


router.post('/assistant/opensite', (req, res) => {
    router.runMiddleware('/opensite', {
        method: 'post',
        body: {
            serverurl: encodeURI(
                "/front/" +
                req.body.name +
                "/lgDetail/1d"
            )
        }
    }, (code, data) => {
        console.log(code, data);
    })
    res.send('Open site ok')
})

router.post('/assistant/openballon',(req,res)=>{
    GSoC.getSensorID(req.body.name).then(r=>{
        axios.get(process.env.kmlbe+
            "/kml/manage/balloon/" +
            r +
            "/1")
        res.send('ok')
    })
})
router.post('/assistant/closeballon',(req,res)=>{
    console.log("Close ballon",req.body.name);
    
    GSoC.getSensorID(req.body.name).then(r=>{
        axios.get(process.env.kmlbe+
            "/kml/manage/balloon/" +
            r +
            "/0")
        res.send('ok')
    })
})

router.post('/assistant/closeite', (req, res) => {
    router.runMiddleware('/closesite', {
        method: 'post',
        body: {
            serverurl: encodeURI(
                process.env.localip +
                "/front/" +
                req.body.name +
                "/lgDetail/1d"
            )
        }
    }, (code, data) => {
        console.log(code, data);
    })
    res.send('Open site ok')
})

router.post('/assistant/datespan', (req, res) => {
    router.runMiddleware('/opensite', {
        method: 'post',
        body: {
            serverurl: encodeURI(
                "/front/" +
                req.body.name +
                "/lgDetail/" +
                req.body.datespan
            )
        }
    }, (code, data) => {
        console.log(code, data);

    })

    res.send('datespan ok')
})




module.exports = router
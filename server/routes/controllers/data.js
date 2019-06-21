const router = require('express').Router()
const GSoC = require('datagsoc') 
var keys = require('../../keys.min')
const bodyParser = require('body-parser')
const response = require('datagsoc/response')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));
GSoC.createConnection(keys)

router.use('/data/*', (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.status(403).send('You are not authenticated')
    } else {
        next()
    }
}

)

router.post('/data/registerRead',(req,res)=>{
    GSoC.registerRead(req.body.name,req.body.val,req.body.hex,req.body.decimal).then(result=>{
        response.send(res,{code:200})
    })

})

router.get('/getAllSensors',(req,res)=>{
    GSoC.getAllSensors().then(data=>{ 
        response.send(res,{code:200,result:data})
    }).catch(error=>{
        response.send(res,{code:503,error:error})
    })
})
router.get('/getSensorInfo',(req,res)=>{
    console.log(req.query);
    
    GSoC.getInfo(req.query.name).then(result=>{
        response.send(res,{code:200,result:result[0]})
        
    })

})

router.get('/readSensor',(req,res)=>{
    GSoC.readSensor(req.query.name).then(result=>{
        console.log(result);
        response.send(res,{code:200,result:result})
        
    })
})



module.exports = router
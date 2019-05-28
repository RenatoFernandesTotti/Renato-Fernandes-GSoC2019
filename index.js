const name = require('datagsoc');
const keys = require('./keys.json')

name.createConnection(keys)
.then(()=>{name.registerSensor({name:'Test',description:'Sensor in the field'})})
.then(()=>{name.getInfo(1)})

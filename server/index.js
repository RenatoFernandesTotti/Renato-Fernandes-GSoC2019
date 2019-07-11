const express = require('express')
//const sql = require('mssql');
const app = express()
const facensKeys = require('./facensKey.min')
const http = require('http');
var cors = require('cors');
// const pool = new sql.ConnectionPool(facensKeys)
// pool.connect()

app.use(cors({credentials: true, origin: 'http://localhost:8181'}))
//app.use(cors({credentials: true, origin: 'https://gsoc-renatofernandes-2019.herokuapp.com'}))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    //res.setHeader('Access-Control-Allow-Origin', 'https://gsoc-renatofernandes-2019.herokuapp.com');
    next();
});
app.use(require('./routes/router'))

var server = http.createServer(app);

server.listen(8888, () => {
    console.log("mas rapaz");
    
})
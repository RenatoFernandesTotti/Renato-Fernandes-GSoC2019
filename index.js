const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const localtunnel = require('localtunnel')
var path = require('path');
var serveStatic = require('serve-static');
var history = require('connect-history-api-fallback');





const unless = function (path, middleware) {
    return function (req, res, next) {
        if (path === req.path) {
            return next();
        } else {
            return middleware(req, res, next);
        }
    };
};





//app.use(unless('/registerRead',cors({credentials: true, origin: 'https://gsoc-renatofernandes-2019.herokuapp.com'})))
app.use(unless('/registerRead', cors({
    credentials: true,
    origin: 'http://localhost:8181'
})))
app.use(unless('/getAllSensors', cors({
    credentials: true,
    origin: 'http://localhost:8181'
})))
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/',(req,res)=>{    
    res.redirect('/front')
})


app.use(express.static('dist'));

app.use('/front', function ( req, res, next ) {
    console.log(req.url);
    
    if (/\/[^.]*$/.test(req.url)) {
        res.sendFile(__dirname + '/dist/index.html');
    } else {
        next();
    }
});

app.use(require('./routes/router'))



var server = http.createServer(app);

server.listen(process.env.PORT, () => {
    console.log("listening on:",process.env.PORT);

})



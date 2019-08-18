const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const localtunnel = require('localtunnel')
const dotenv = require('dotenv');
var ifaces = require('os').networkInterfaces();
dotenv.config();





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

app.get('/', (req, res) => {
    res.redirect('/front')
})


app.use(express.static('dist'));

app.use('/front', function (req, res, next) {

    if (/\/[^.]*$/.test(req.url)) {
        res.sendFile(__dirname + '/dist/index.html');
    } else {
        next();
    }
});

app.use(require('./routes/router'))



var server = http.createServer(app);

server.listen(8888, () => {

    var adresses = Object.keys(ifaces).reduce(function (result, dev) {
        return result.concat(ifaces[dev].reduce(function (result, details) {
            return result.concat(details.family === 'IPv4' && !details.internal ? [details.address] : []);
        }, []));
    });
    console.log(adresses);
    
    console.log('env variables\n',
        "Master IP:", process.env.masterIp, "\n",
        "Slave IP:", process.env.slaveIp, "\n",
        "key:", process.env.key, '\n',
        'User:', process.env.user, '\n',
    );

})


var tunnel = localtunnel(8888, {
    subdomain: "renatogsoc"
}, function (err, tunnel) {
    if (err) {

    }
    process.env.URL = tunnel.url
    console.log(tunnel.url);


});

tunnel.on('close', function () {
    console.log('Local tunnel closed');

})
tunnel.on('error', function (err) {
    console.log("Localtunnel error:", err);

})
tunnel.on('request', function (info) {
    console.log("Localtunnel request:", info);


})
const router = require('express').Router()
const GSoC = require('datagsoc')
var keys = require('../../../keys.min')
const bodyParser = require('body-parser')
const axios = require('axios')
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto')
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended: false
}));
GSoC.createConnection(keys)



passport.use(new LocalStrategy({
        usernameField: 'name'
    },
    (name, password, done) => {
        user(name)
            .then(res => {
                const user = res
                console.log("Passport user")
                console.log(user);
                
                
                if (!user) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n'
                    });
                }
                
                if (crypto.createHash('sha512').update(password).digest('hex') != user.userPass) {
                    return done(null, false, {
                        message: 'Invalid credentials.\n'
                    });
                }
                
                return done(null, user);
            })
            .catch(error => done(error));
    }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {

    done(null, user.idUsers);
});

passport.deserializeUser((id, done) => {

    user(id)
        .then(res => {
            console.log("Deserialize");
            
            console.log(res);

            done(null, res)
        })
        .catch(error => done(error, false))
});


router.use(session({
    genid: (req) => {
        return uuid() // use UUIDs for session IDs
    },
    store: new FileStore(),
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))
router.use(passport.initialize());
router.use(passport.session());


router.get('/auth/logout', (req, res) => {
    req.logout();

    console.log("logged out")

    return res.send();
})

router.post('/auth/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {

        console.log(info);
        if (info) {

            return res.status(418).send(info.message)
        }
        if (err) {

            return res.status(500).send(err)
        }
        if (!user) {

            return res.status(401).send("User not found");
        }
        req.login(user, (err) => {
            if (err) {

                return res.status(401).send(err);
            }

            return res.status(200).send("ok");
        })
    })(req, res, next);
})

router.post('/auth/register',(req,res)=>{
    GSoC.registerUser({userName:req.body.name,userMail:req.body.email,userPass:req.body.password}).then(result=>{

        axios.post('http://localhost:8888/auth/login',{name:req.body.name,password:req.body.password}).then(result=>{
            console.log(result);
            if(result.status == 200)
                res.status(200).send("Registered!")
        })
    })
})


const user = (name) => {
    return new Promise((resolve, reject) => {
        console.log("Getting user with: "+name);
        
        GSoC.getUser(name).then(result => {
            console.log("Get user result:");
            console.log(result);
            
            
            resolve(result)

        })
    })

}




module.exports = router